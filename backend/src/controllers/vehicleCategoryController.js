import VehicleCategory from '../models/VehicleCategory.js';

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new VehicleCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Category creation failed', error: err.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await VehicleCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Fetching categories failed', error: err.message });
  }
};
