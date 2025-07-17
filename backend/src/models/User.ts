import { MongooseModel } from '@src/utils/db.utils';
import { Schema } from 'mongoose';

interface IUser {
    username: string;
    points: number;
}

const userSchema: Schema = new Schema<IUser>({
    username: { type: String, required: true },
    points: { type: Number, required: false, default: 0 },
});

const User = MongooseModel<IUser>('users', userSchema);

export { IUser, User };