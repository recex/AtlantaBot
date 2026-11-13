import mongoose, { Schema } from "mongoose";
const logSchema = new Schema({
    commandName: { type: String, default: "unknown" },
    date: { type: Number, default: () => Date.now() },
    author: {
        type: Object,
        default: { username: "Unknown", id: null },
    },
    guild: {
        type: Object,
        default: { name: "Unknown", id: null },
    },
});
export default mongoose.model("Log", logSchema);
//# sourceMappingURL=Log.js.map