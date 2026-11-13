import mongoose, { type Document } from "mongoose";
export interface Achievement {
    achieved: boolean;
    progress: {
        now: number;
        total: number;
    };
}
export interface IUser extends Document {
    id: string;
    rep: number;
    bio?: string;
    birthdate?: number;
    lover?: string;
    registeredAt: number;
    achievements: {
        married: Achievement;
        work: Achievement;
        firstCommand: Achievement;
        slots: Achievement;
        tip: Achievement;
        rep: Achievement;
        invite: Achievement;
    };
    cooldowns: {
        rep: number;
    };
    afk: string | null;
    reminds: Array<{
        message: string;
        createdAt: number;
        sendAt: number;
    }>;
    logged: boolean;
    apiToken: string;
    genApiToken(): Promise<string>;
    getAchievements(): Promise<Buffer>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=User.d.ts.map