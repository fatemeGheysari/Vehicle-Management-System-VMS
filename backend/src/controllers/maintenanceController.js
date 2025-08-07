import MaintenanceRecord from "../models/MaintenanceRecord.js";
import Vehicle from "../models/Vehicle.js";
import Bill from "../models/Bill.js";

export const createMaintenanceRecord = async (req, res) => {
  try {
    const { vehicleId, serviceDate, services, partsUsed } = req.body;

    if (!vehicleId || !services?.length) {
      return res.status(400).json({ message: "vehicleId and services are required" });
    }

    // 1. Save the new maintenance record
    const newRecord = new MaintenanceRecord({
      vehicleId,
      serviceDate,
      services,
      partsUsed
    });

    const savedRecord = await newRecord.save();
    const populatedRecord = await savedRecord.populate("vehicleId partsUsed");

    // 2. Fetch vehicle and its owner
    const vehicle = await Vehicle.findById(vehicleId).populate("ownerId");
    if (!vehicle || !vehicle.ownerId) {
      return res.status(400).json({ message: "Vehicle or owner not found" });
    }

    // 3. Calculate total cost of services
    const totalPrice = services.reduce((sum, s) => sum + s.cost, 0);

    // 4. Create a new invoice (bill) automatically
    const newBill = new Bill({
      vehicle: vehicle._id,
      customer: vehicle.ownerId._id,
      maintenanceId: savedRecord._id, // Link to the maintenance record
      services: services.map(s => ({
        description: s.description,
        price: s.cost
      })),
      totalPrice,
      date: serviceDate
    });

    await newBill.save();
    console.log("✅ Auto-created invoice:", newBill._id);

    res.status(201).json(populatedRecord);
  } catch (error) {
    console.error("❌ Error creating maintenance record & bill:", error);
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

export const getMaintenanceById = async (req, res) => {
  try {
    const record = await MaintenanceRecord.findById(req.params.id)
      .populate("vehicleId")
      .populate("partsUsed");

    if (!record) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error("❌ Error fetching maintenance record:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateMaintenance = async (req, res) => {
  try {
    const { vehicleId, serviceDate, services, partsUsed } = req.body;

    const updated = await MaintenanceRecord.findByIdAndUpdate(
      req.params.id,
      {
        vehicleId,
        serviceDate,
        services,
        partsUsed
      },
      { new: true }
    )
      .populate("vehicleId")
      .populate("partsUsed");

    if (!updated) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    const totalPrice = services.reduce((sum, s) => sum + s.cost, 0);

    const bill = await Bill.findOneAndUpdate(
      { maintenanceId: updated._id },
      {
        services: services.map(s => ({
          description: s.description,
          price: s.cost
        })),
        totalPrice,
        date: serviceDate
      },
      { new: true }
    );

    console.log("🧾 Updated related invoice:", bill?._id);

    res.json(updated);
  } catch (error) {
    console.error("❌ Error updating maintenance record:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


