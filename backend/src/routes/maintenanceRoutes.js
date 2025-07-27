import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
    createMaintenanceRecord,
    getAllMaintenanceRecords,
    deleteMaintenance
} from '../controllers/maintenanceController.js';

import Maintenance from '../models/MaintenanceRecord.js';

const router = express.Router();

// OPTIONAL: Inline GET route (e.g. for testing or special route)
router.get('/populated', async (req, res) => {
    try {
        const records = await Maintenance.find().populate("vehicleId");
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protect all maintenance routes
router.use(authMiddleware);

// Main routes
router.post('/', createMaintenanceRecord);
router.get('/', getAllMaintenanceRecords);
router.delete('/:id', deleteMaintenance);

export default router;
