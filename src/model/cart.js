import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema(
  {
    email: { type: String, required: true, ref: "User" },
    productId: { type: String, required: true, ref: "Product" },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Cart", cartSchema);
