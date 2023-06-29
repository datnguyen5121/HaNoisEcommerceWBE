import { Schema } from "mongoose";
import mongoose from "mongoose";

const sizeSchema = new Schema(
  {
    subnavName: { type: String, required: true },
    size: { type: Array, required: true },
  },
  {
    timestamps: true,
  },
);

// productShema.index({ "$**": "text" }); // này là tìm tất cả
export default mongoose.model("Size", sizeSchema);
