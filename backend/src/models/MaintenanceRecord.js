const mongoose = require('mongoose');

const maintenanceRecordSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  serviceDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  mileage: {
    type: Number,
    required: true,
    min: 0
  },
  partsUsed: {
    type: [String], // Optional: list of part names used
    default: []
  }
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});

const MaintenanceRecord = mongoose.model('MaintenanceRecord', maintenanceRecordSchema);

module.exports = MaintenanceRecord;
