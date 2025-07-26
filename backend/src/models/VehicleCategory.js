//model/VehicleCategory.js
const mongoose = require('mongoose');

const vehicleCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

const VehicleCategory = mongoose.model('VehicleCategory', vehicleCategorySchema);

module.exports = VehicleCategory;
