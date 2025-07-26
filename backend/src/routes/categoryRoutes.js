//backend/src/rutes/categoryRutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/vehicleCategoryController');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);

module.exports = router;
