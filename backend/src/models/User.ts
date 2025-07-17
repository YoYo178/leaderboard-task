import { MongooseModel } from '@src/utils/db.utils';
import { Schema } from 'mongoose';

interface IUser {
    name: string;
    points: number;
    pointsHistory: IUserPointsHistory[];
}

interface IUserPointsHistory {
    pointsAdded: number;
    timestamp: number;
}

const userPointsHistorySchema: Schema = new Schema<IUserPointsHistory>({
    pointsAdded: { type: Number, required: true },
    timestamp: { type: Number, required: true },
})

const userSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    points: { type: Number, required: false, default: 0 },
    pointsHistory: { type: [userPointsHistorySchema], required: false, default: [] }
});

const User = MongooseModel<IUser>('users', userSchema);

export { IUser, User };