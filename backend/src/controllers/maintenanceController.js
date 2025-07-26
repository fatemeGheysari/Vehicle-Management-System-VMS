
const MaintenanceRecord = require('../models/MaintenanceRecord');

// @desc    Create a new maintenance record
// @route   POST /api/maintenance
// @access  Private

const createMaintenanceRecord = async (req, res) => {
  try {
    const { vehicleId, serviceDate, description, cost, mileage, partsUsed } = req.body;

    const newRecord = new MaintenanceRecord({
      vehicleId,
      serviceDate,
      description,
      cost,
      mileage,
      partsUsed,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error('Error creating maintenance record:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Get all maintenance records
// @route   GET /api/maintenance
// @access  Private
const getAllRecords = async (req, res) => {
  try {
    const records = await MaintenanceRecord.find().populate('vehicleId');
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createMaintenanceRecord,
  getAllRecords,
};
