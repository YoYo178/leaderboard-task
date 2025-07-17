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

        user.points += Math.floor(Math.random() * 10) + 1;

        await user.save()

        res.status(HttpStatusCodes.OK).json({ success: true, data: { user } });
    } catch (error) {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
    }
}