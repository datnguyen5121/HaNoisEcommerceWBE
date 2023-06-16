import { Schema } from "mongoose";
import mongoose from "mongoose";

const allcodeSchema = new Schema(
    {
        keyMap: { type: String, required: true },
        type: { type: String, required: true },
        value: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Allcode", allcodeSchema);
