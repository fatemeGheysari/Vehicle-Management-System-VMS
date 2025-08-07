import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    services: [{
        description: String,
        cost: Number
    }]
}, {
    timestamps: true
});

export default mongoose.model("Invoice", invoiceSchema);
