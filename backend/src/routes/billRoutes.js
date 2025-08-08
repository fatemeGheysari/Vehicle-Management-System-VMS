import express from 'express';
import {
    createBill,
    getAllBills,
    getBillById,
    updateBill,
    deleteBill,
    getBillByMaintenanceId,
    getArchivedBills,
} from '../controllers/billController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBill);
router.get('/', authMiddleware, getAllBills);


router.get("/archived", getArchivedBills);
router.get("/by-maintenance/:maintenanceId", getBillByMaintenanceId);

router.get('/:id', getBillById);
router.put('/:id', authMiddleware, updateBill);
router.delete('/:id', authMiddleware, deleteBill);

export default router;
