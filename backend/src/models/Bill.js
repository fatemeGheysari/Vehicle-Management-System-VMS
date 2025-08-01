import mongoose from 'mongoose';

const serviceItemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

const billSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    services: [serviceItemSchema],
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Bill = mongoose.model('Bill', billSchema);
export default Bill;
