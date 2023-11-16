const Joi = require('joi');

exports.userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

exports.categorySchema = Joi.object({
    title: Joi.string().required()
})

exports.productSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    stok: Joi.number().integer().required(),
    harga: Joi.number().required(),
    categoryId: Joi.number().integer().required(),
})

exports.orderSchema = Joi.object({
    userId: Joi.number().required(),
    productId: Joi.number().required(),
    orderDate: Joi.date().required(),
    status: Joi.string().valid('pending', 'completed').required(),
    quantity: Joi.number().integer().min(1).required(),
})