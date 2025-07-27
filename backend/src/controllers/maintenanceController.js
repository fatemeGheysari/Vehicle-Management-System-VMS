import MaintenanceRecord from "../models/MaintenanceRecord.js";

export const createMaintenanceRecord = async (req, res) => {
  try {
    const { vehicleId, serviceDate, description, cost, mileage, partsUsed } = req.body;
    if (!vehicleId) {
      return res.status(400).json({ message: "vehicleId is required" });
    }

    const newRecord = new MaintenanceRecord({
      vehicleId,
      serviceDate,
      description,
      cost,
      mileage,
      partsUsed,
    });

    const savedRecord = await newRecord.save();
    console.log("✅ savedRecord:", savedRecord);
    const populatedRecord = await savedRecord.populate("vehicleId");
    console.log("📦 populatedRecord:", populatedRecord);

    res.status(201).json(populatedRecord);
  } catch (error) {
    console.error("Error creating maintenance record:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteMaintenance = async (req, res) => {
  try {
    const record = await MaintenanceRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMaintenanceRecords = async (req, res) => {
  try {
    const records = await MaintenanceRecord.find().populate('vehicleId');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
