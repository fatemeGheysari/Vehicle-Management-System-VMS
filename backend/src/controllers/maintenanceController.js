import MaintenanceRecord from "../models/MaintenanceRecord.js";

export const createMaintenanceRecord = async (req, res) => {
  try {
    const { vehicleId, serviceDate, services, partsUsed } = req.body;

    if (!vehicleId || !services?.length) {
      return res.status(400).json({ message: "vehicleId and at least one service are required" });
    }
    console.log("📥 req.body:", req.body);

    const newRecord = new MaintenanceRecord({
      vehicleId,
      serviceDate,
      services,
      partsUsed
    });

    const savedRecord = await newRecord.save();
    const populatedRecord = await savedRecord.populate("vehicleId");

    res.status(201).json(populatedRecord);
  } catch (error) {
    console.error("❌ Error creating maintenance record:", error);
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
    const records = await MaintenanceRecord.find()
      .populate("vehicleId")
      .populate({
        path: "partsUsed",
        select: "name"
      });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



