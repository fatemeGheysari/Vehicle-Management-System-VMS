import express from 'express';
import { createBill, getAllBills } from '../controllers/billController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getBillById } from '../controllers/billController.js';
import { updateBill } from '../controllers/billController.js';

const router = express.Router();

router.post('/', authMiddleware, createBill);
router.get('/', authMiddleware, getAllBills);
router.get('/:id', getBillById);
router.put('/:id', authMiddleware, updateBill);

export default router;
