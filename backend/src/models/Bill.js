import mongoose from 'mongoose';


const billSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    maintenanceId: { type: mongoose.Schema.Types.ObjectId, ref: "MaintenanceRecord", required: false },
    services: [{ description: String, price: Number }],
    totalPrice: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    archived: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Bill", billSchema);
