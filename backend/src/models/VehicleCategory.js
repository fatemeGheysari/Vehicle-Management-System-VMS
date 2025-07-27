//model/VehicleCategory.js
import mongoose from 'mongoose';

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

export default VehicleCategory;
