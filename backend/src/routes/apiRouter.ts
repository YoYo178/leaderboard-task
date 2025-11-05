import { Router } from 'express';
import { userRouter } from './userRouter';

export const APIRouter = Router();

APIRouter.use('/users', userRouter);
