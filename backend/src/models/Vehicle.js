// models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2100
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VehicleCategory',
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  }
}, {
  timestamps: true 
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
