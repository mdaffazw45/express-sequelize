const express = require('express');
const userRoute = require('./userRoute');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const orderRoute = require('./orderRoute');
const router = express.Router();

router.use('/user', userRoute);
router.use('/categories', categoryRoute);
router.use('/products', productRoute )
router.use('/orders', orderRoute )

module.exports = router;