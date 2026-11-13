import mongoose, { type Document } from "mongoose";
export interface ILog extends Document {
    commandName: string;
    date: number;
    author: {
        username: string;
        id: string | null;
    };
    guild: {
        name: string;
        id: string | null;
    };
}
declare const _default: mongoose.Model<ILog, {}, {}, {}, mongoose.Document<unknown, {}, ILog, {}, mongoose.DefaultSchemaOptions> & ILog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Log.d.ts.map