const { Category, Product } = require('../models');
const { productSchema } = require('../helper/validateAttribute');


exports.getProductByCategory = async (req, res) => {
    try{
        const categoryId = req.params.categoryId; 

        // Find Category Based on ID
        const category = await Category.findByPk(categoryId, {
            include: 'product_category'
        });

        if (!category) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        
        }

        return res.status(200).json({ category });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

exports.createProductWithCategory = async (req, res) => {
    try{
        const { title, description, stok, harga, categoryId } = req.body;

        const { error } = productSchema.validate({ title, description, stok, harga, categoryId });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Buat user baru
        await Product.create({ title, description, stok, harga, categoryId });

        const response = await Product.findAll({
            include: 'product_category'
        })

        res.status(201).json({ message: 'Product berhasil ditambahkan', data: response });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

exports.editProduct = async(req, res) => {
    try{
        const { productId } = req.params;
        const { title, description, stok, harga, categoryId } = req.body;
        const { error } = productSchema.validate({ title, description, stok, harga, categoryId });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Cari produk yang akan diedit berdasarkan productId
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        

        await product.update({
            title,
            description,
            stok,
            harga,
            categoryId,
        });

        const response = await Product.findAll({
            include: 'product_category'
        })

        res.status(200).json({ message: 'Product berhasil diperbarui', data: response });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const { productId } = req.params
        
        // Cari produk yang akan dihapus berdasarkan productId
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Hapus produk dari database
        await product.destroy();

        // Kembalikan respons berhasil
        res.status(200).json({ message: 'Product berhasil dihapus' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}
