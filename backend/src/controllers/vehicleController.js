const Vehicle = require('../models/Vehicle');

// GET /api/vehicles → Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('ownerId categoryId');
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/vehicles → Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const saved = await newVehicle.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

// GET /api/vehicles/:id → Get vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('ownerId categoryId');
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/vehicles/:id → Update a vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Invalid update', error: err.message });
  }
};

// DELETE /api/vehicles/:id → Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
