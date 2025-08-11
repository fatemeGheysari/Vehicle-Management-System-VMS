// backend/src/controllers/partController.js
import Part from "../models/Part.js";

// createPart
export const createPart = async (req, res) => {
    try {
        const { name, price, quantity } = req.body; // added stock
        const part = new Part({ name, price, quantity });
        await part.save();
        res.status(201).json(part);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/parts
export const getAllParts = async (req, res) => {
    try {
        // sort by name ascending
        const parts = await Part.find().sort({ name: 1 });
        res.json(parts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching parts", error: err.message });
    }
};

// GET /api/parts/:id
export const getPartById = async (req, res) => {
    try {
        const part = await Part.findById(req.params.id);
        if (!part) {
            return res.status(404).json({ message: "Part not found" });
        }
        res.json(part);
    } catch (err) {
        res.status(500).json({ message: "Error fetching part", error: err.message });
    }
};


// updatePart
export const updatePart = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const part = await Part.findByIdAndUpdate(
            req.params.id,
            { name, price, quantity },
            { new: true }
        );
        if (!part) return res.status(404).json({ message: "Part not found" });
        res.json(part);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/parts/:id/order
export const addPartOrder = async (req, res) => {
    try {
        const { supplier, amount, notes, orderDate } = req.body;

        // ✅ Basic validation
        // amount must be a positive integer (or number) to increase stock
        if (typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({ message: "amount must be a positive number" });
        }

        // 1) Find part by id
        const part = await Part.findById(req.params.id);
        if (!part) return res.status(404).json({ message: "Part not found" });

        // 2) Increase quantity (stock)
        //    Use safe default in case quantity is undefined
        const currentQty = typeof part.quantity === "number" ? part.quantity : 0;
        part.quantity = currentQty + amount;

        // 3) Update lastOrder sub-document
        part.lastOrder = {
            supplier: supplier || part.lastOrder?.supplier || "",
            orderDate: orderDate ? new Date(orderDate) : new Date(),
            amount,
            notes: notes || ""
        };

        // 4) Save changes
        const saved = await part.save();

        // 5) Respond with updated part
        res.status(201).json({
            message: "Order recorded and stock increased",
            part: saved
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to record order", error: err.message });
    }
};

// GET /api/parts/low-stock
export const getLowStockParts = async (req, res) => {
    try {
        // Default limit (e.g. 5) or value from query
        const threshold = parseInt(req.query.threshold) || 5;

        const lowStockParts = await Part.find({ quantity: { $lt: threshold } });

        res.json(lowStockParts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching low stock parts", error: err.message });
    }
};

