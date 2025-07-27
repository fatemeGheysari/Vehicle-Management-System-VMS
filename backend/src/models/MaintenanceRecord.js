import mongoose from "mongoose";

const maintenanceRecordSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  serviceDate: { type: Date, required: true },
  description: { type: String, required: true },
  mileage: { type: Number, required: true },
  cost: { type: Number, required: true },
  partsUsed: { type: String },
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

const MaintenanceRecord = mongoose.model("MaintenanceRecord", maintenanceRecordSchema);
export default MaintenanceRecord;
