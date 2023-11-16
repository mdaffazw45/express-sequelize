const express = require('express');
const { getProductByCategory, createProductWithCategory, editProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/:categoryId/categories', getProductByCategory);
router.post('/add', createProductWithCategory)
router.put('/edit/:productId', editProduct)
router.delete('/delete/:productId', deleteProduct);

module.exports = router;