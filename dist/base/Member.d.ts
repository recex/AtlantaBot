import mongoose, { type Document } from "mongoose";
export interface IMember extends Document {
    id: string;
    guildID: string;
    money: number;
    workStreak: number;
    bankSold: number;
    exp: number;
    level: number;
    registeredAt: number;
    cooldowns: {
        work: number;
        rob: number;
    };
    sanctions: Array<{
        type: string;
        case: number;
        date: number;
        moderator: string;
        reason: string;
    }>;
    mute: {
        muted: boolean;
        case: number | null;
        endDate: number | null;
    };
}
declare const _default: mongoose.Model<IMember, {}, {}, {}, mongoose.Document<unknown, {}, IMember, {}, mongoose.DefaultSchemaOptions> & IMember & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IMember & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Member.d.ts.map