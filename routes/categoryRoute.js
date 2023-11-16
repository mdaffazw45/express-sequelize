const express = require('express');
const { getCategory, addCategory , deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

router.get('/', getCategory)
router.post('/add', addCategory)
router.delete('/:categoryId', deleteCategory)

module.exports = router;