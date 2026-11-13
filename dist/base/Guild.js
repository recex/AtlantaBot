import mongoose, { Schema } from "mongoose";
import languageMeta from "../../languages/language-meta.json" with { type: "json" };
const defaultLanguage = languageMeta.find((l) => l.default)?.name ?? "en-US";
const guildSchema = new Schema({
    id: { type: String, required: true },
    membersData: { type: Object, default: {} },
    members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    language: { type: String, default: defaultLanguage },
    plugins: {
        type: Object,
        default: {
            welcome: { enabled: false, message: null, channel: null, withImage: null },
            goodbye: { enabled: false, message: null, channel: null, withImage: null },
            autorole: { enabled: false, role: null },
            automod: { enabled: false, ignored: [] },
            warnsSanctions: { kick: false, ban: false },
            tickets: { enabled: false, category: null },
            suggestions: false,
            modlogs: false,
            reports: false,
            logs: false,
        },
    },
    slowmode: {
        type: Object,
        default: { users: [], channels: [] },
    },
    casesCount: { type: Number, default: 0 },
    ignoredChannels: { type: [String], default: [] },
    customCommands: { type: [Object], default: [] },
    commands: { type: [Object], default: [] },
    autoDeleteModCommands: { type: Boolean, default: false },
    disabledCategories: { type: [String], default: [] },
});
export default mongoose.model("Guild", guildSchema);
//# sourceMappingURL=Guild.js.map