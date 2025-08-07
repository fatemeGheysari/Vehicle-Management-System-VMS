// backend/src/controllers/partController.js
import Part from "../models/Part.js";

// GET /api/parts
export const getAllParts = async (req, res) => {
    try {
        const parts = await Part.find();
        res.json(parts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching parts", error: err.message });
    }
};

// POST /api/parts
export const createPart = async (req, res) => {
    try {
        const part = new Part(req.body);
        await part.save();
        res.status(201).json(part);
    } catch (err) {
        res.status(400).json({ message: "Error creating part", error: err.message });
    }
};
