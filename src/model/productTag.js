import { Schema } from "mongoose";
import mongoose from "mongoose";

const productTagSchema = new Schema(
  {
    subnavName: { type: String, required: true },
    list: [{ type: String }],
    navName: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("ProductTag", productTagSchema);
