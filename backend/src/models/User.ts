import mongoose from 'mongoose';

interface IUser {
    name: string;
    points: number;
    pointsHistory: IUserPointsHistory[];
}

interface IUserPointsHistory {
    pointsAdded: number;
    timestamp: number;
}

const userPointsHistorySchema: mongoose.Schema = new mongoose.Schema<IUserPointsHistory>({
    pointsAdded: { type: Number, required: true },
    timestamp: { type: Number, required: true },
})

const userSchema: mongoose.Schema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    points: { type: Number, required: false, default: 0 },
    pointsHistory: { type: [userPointsHistorySchema], required: false, default: [] }
});

const User = mongoose.model<IUser>('users', userSchema);

export { IUser, User };