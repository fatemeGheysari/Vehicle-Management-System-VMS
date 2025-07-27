// backend/src/routes/customerRoutes.js
import express from 'express';
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} from '../controllers/customerController.js';

const router = express.Router();

// CRUD routes
router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
