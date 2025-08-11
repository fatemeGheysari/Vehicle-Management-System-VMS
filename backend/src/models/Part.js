// backend/src/models/Part.js
import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    price: { type: Number, default: 0 },
    lastOrder: {
        supplier: String,
        orderDate: Date,
        amount: Number,
        notes: String
    }
}, {
    timestamps: true
});

export default mongoose.model("Part", partSchema);