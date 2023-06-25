import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const productShema = new Schema(
    {
        gender: { type: String, required: false },
        productName: { type: String, required: false },
        title: { type: String, required: false },
        description: { type: String, required: false },
        datePublish: { type: String, required: false },
        category: { type: Array, required: true },
        size: { type: Array, required: true },
        imgUrl: { type: Array, required: false },
        price: { type: Number, required: false },
    },
    {
        timestamps: true,
    },
);
productShema.index({ title: 'text' });

// productShema.index({ "$**": "text" }); // này là tìm tất cả
export default mongoose.model('Product', productShema);
