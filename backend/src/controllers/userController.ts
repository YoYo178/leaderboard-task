import HttpStatusCodes from "@src/common/HttpStatusCodes"
import { User } from "@src/models/User"
import type { Request, Response } from "express"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(HttpStatusCodes.OK).json({ success: true, data: { users } })
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const userID = req.params?.userID;

    if (!userID) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ success: false, error: 'userID is required!' });
        return;
    }

    try {
        const user = await User.findById(userID);

        if (!user) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, error: 'User not found!' });
            return;
        }

        res.status(HttpStatusCodes.OK).json({ success: true, data: { user } })
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const user = await User.create({ name });
        res.status(HttpStatusCodes.CREATED).json({ success: true, data: { user } });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message })
    }
}

export const addPointsToUser = async (req: Request, res: Response) => {
    const userID = req.params?.userID;

    if (!userID) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({ success: false, error: 'userID is required!' });
        return;
    }

    try {
        const user = await User.findById(userID);

        if (!user) {
            res.status(HttpStatusCodes.NOT_FOUND).json({ success: false, error: 'User not found!' });
            return;
        }

        const pointsAdded = Math.floor(Math.random() * 10) + 1

        user.points += pointsAdded;

        user.pointsHistory = [
            ...(user.pointsHistory || []), // Just in case the user's object doesn't have the pointsHistory property
            {
                pointsAdded,
                timestamp: Date.now()
            }
        ]

        await user.save()

        res.status(HttpStatusCodes.OK).json({
            success: true, data: {
                user: { // Don't want to be sending the entire points history on every "claim", so we use (GET /api/users/:userID) for points history
                    _id: user._id,
                    name: user.name,
                    points: user.points,
                },
                pointsAdded
            }
        });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
    }
}