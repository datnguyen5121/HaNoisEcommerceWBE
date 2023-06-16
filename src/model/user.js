import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    roleId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
