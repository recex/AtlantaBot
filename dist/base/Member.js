import mongoose, { Schema } from "mongoose";
const memberSchema = new Schema({
    id: { type: String, required: true },
    guildID: { type: String, required: true },
    money: { type: Number, default: 0 },
    workStreak: { type: Number, default: 0 },
    bankSold: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    registeredAt: { type: Number, default: () => Date.now() },
    cooldowns: {
        type: Object,
        default: { work: 0, rob: 0 },
    },
    sanctions: { type: [Object], default: [] },
    mute: {
        type: Object,
        default: { muted: false, case: null, endDate: null },
    },
});
export default mongoose.model("Member", memberSchema);
//# sourceMappingURL=Member.js.map