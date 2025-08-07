import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true
  },
  serviceDate: {
    type: Date,
    required: true
  },
  services: [
    {
      description: { type: String, required: true },
      cost: { type: Number, required: true }
    }
  ],
  partsUsed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Part"
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model("MaintenanceRecord", maintenanceSchema);
