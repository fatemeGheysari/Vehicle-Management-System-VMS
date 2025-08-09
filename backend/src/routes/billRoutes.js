import express from 'express';
import {
    createBill,
    getAllBills,
    getBillById,
    updateBill,
    deleteBill,
    getBillByMaintenanceId,
    getArchivedBills,
    archiveBill,
    getRecentBills,
} from '../controllers/billController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBill);
router.get('/', authMiddleware, getAllBills);

router.get("/recent", getRecentBills);
router.get("/archived", getArchivedBills);
router.get("/by-maintenance/:maintenanceId", getBillByMaintenanceId);

router.get('/:id', getBillById);
router.put('/:id', authMiddleware, updateBill);
router.delete('/:id', authMiddleware, deleteBill);
router.patch('/:id/archive', authMiddleware, archiveBill);

export default router;
