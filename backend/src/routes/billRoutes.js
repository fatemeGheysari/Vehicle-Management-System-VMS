import express from 'express';
import { createBill, getAllBills } from '../controllers/billController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createBill);
router.get('/', authMiddleware, getAllBills);

export default router;
