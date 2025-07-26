const VehicleCategory = require('../models/VehicleCategory');

// Create new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new VehicleCategory({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Category creation failed', error: err.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await VehicleCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Fetching categories failed', error: err.message });
  }
};
