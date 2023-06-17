import { Schema } from "mongoose";
import mongoose from "mongoose";

const productShema = new Schema(
  {
    productName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    datePublish: { type: String, required: true },
    category: { type: Array, required: true },
    size: { type: Array, required: true },
    imgUrl: { type: Array, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
productShema.index({ title: "text" });

// productShema.index({ "$**": "text" }); // này là tìm tất cả
export default mongoose.model("Product", productShema);
