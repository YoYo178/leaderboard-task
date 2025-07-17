import { addPointsToUser, createUser, getAllUsers, getUser } from "@src/controllers/userController";
import { Router } from "express";

export const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userID', getUser);

userRouter.post('/', createUser);
userRouter.post('/:userID/add-points', addPointsToUser);
