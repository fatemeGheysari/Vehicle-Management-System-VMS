// backend/src/models/Part.js
import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model("Part", partSchema);
