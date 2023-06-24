import { Schema } from "mongoose";
import mongoose from "mongoose";

const tagSchema = new Schema(
  {
    navName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Tag", tagSchema);
