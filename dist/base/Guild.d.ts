import mongoose, { type Document, type Types } from "mongoose";
export interface IGuildPlugins {
    welcome: {
        enabled: boolean;
        message: string | null;
        channel: string | null;
        withImage: boolean | null;
    };
    goodbye: {
        enabled: boolean;
        message: string | null;
        channel: string | null;
        withImage: boolean | null;
    };
    autorole: {
        enabled: boolean;
        role: string | null;
    };
    automod: {
        enabled: boolean;
        ignored: string[];
    };
    warnsSanctions: {
        kick: number | false;
        ban: number | false;
    };
    tickets: {
        enabled: boolean;
        category: string | null;
    };
    suggestions: string | false;
    modlogs: string | false;
    reports: string | false;
    logs: string | false;
}
export interface IGuild extends Document {
    id: string;
    membersData: Record<string, unknown>;
    members: Types.ObjectId[];
    language: string;
    plugins: IGuildPlugins;
    slowmode: {
        users: Array<{
            id: string;
            time: number;
        }>;
        channels: Array<{
            id: string;
            time: number;
        }>;
    };
    casesCount: number;
    ignoredChannels: string[];
    customCommands: Array<{
        name: string;
        answer: string;
    }>;
    commands: unknown[];
    autoDeleteModCommands: boolean;
    disabledCategories: string[];
}
declare const _default: mongoose.Model<IGuild, {}, {}, {}, mongoose.Document<unknown, {}, IGuild, {}, mongoose.DefaultSchemaOptions> & IGuild & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, IGuild & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Guild.d.ts.map