//backend/src/rutes/customerRutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// CRUD routes
router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
