import HTTP_STATUS_CODES from '@src/common/HTTP_STATUS_CODES';
import { User } from '@src/models/User';
import type { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(HTTP_STATUS_CODES.Ok).json({ success: true, data: { users } });
  } catch (error) {
    let errorMessage = 'Unknown error, please try again later.';

    if (error instanceof Error)
      errorMessage = error.message;

    res.status(HTTP_STATUS_CODES.InternalServerError).json({ success: false, error: errorMessage });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userID = req.params?.userID;

  if (!userID) {
    res.status(HTTP_STATUS_CODES.BadRequest).json({ success: false, error: 'userID is required!' });
    return;
  }

  try {
    const user = await User.findById(userID);

    if (!user) {
      res.status(HTTP_STATUS_CODES.NotFound).json({ success: false, error: 'User not found!' });
      return;
    }

    res.status(HTTP_STATUS_CODES.Ok).json({ success: true, data: { user } });
  } catch (error) {
    let errorMessage = 'Unknown error, please try again later.';

    if (error instanceof Error)
      errorMessage = error.message;

    res.status(HTTP_STATUS_CODES.InternalServerError).json({ success: false, error: errorMessage });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body as { name?: string };

  if (!name) {
    res.status(HTTP_STATUS_CODES.BadRequest).json({ success: false, error: 'Field \'name\' is required!' });
    return;
  }

  try {
    const user = await User.create({ name });
    res.status(HTTP_STATUS_CODES.Created).json({ success: true, data: { user } });
  } catch (error) {
    let errorMessage = 'Unknown error, please try again later.';

    if (error instanceof Error)
      errorMessage = error.message;

    res.status(HTTP_STATUS_CODES.InternalServerError).json({ success: false, error: errorMessage });
  }
};

export const addPointsToUser = async (req: Request, res: Response) => {
  const userID = req.params?.userID;

  if (!userID) {
    res.status(HTTP_STATUS_CODES.BadRequest).json({ success: false, error: 'userID is required!' });
    return;
  }

  try {
    const user = await User.findById(userID);

    if (!user) {
      res.status(HTTP_STATUS_CODES.NotFound).json({ success: false, error: 'User not found!' });
      return;
    }

    const pointsAdded = Math.floor(Math.random() * 10) + 1;

    user.points += pointsAdded;

    user.pointsHistory = [
      ...(user.pointsHistory || []), // Just in case the user's object doesn't have the pointsHistory property
      {
        pointsAdded,
        timestamp: Date.now(),
      },
    ];

    await user.save();

    res.status(HTTP_STATUS_CODES.Ok).json({
      success: true, data: {
        user: { // Don't want to be sending the entire points history on every "claim", so we use (GET /api/users/:userID) for points history
          _id: user._id,
          name: user.name,
          points: user.points,
        },
        pointsAdded,
      },
    });
  } catch (error) {
    let errorMessage = 'Unknown error, please try again later.';

    if (error instanceof Error)
      errorMessage = error.message;

    res.status(HTTP_STATUS_CODES.InternalServerError).json({ success: false, error: errorMessage });
  }
};