const { categorySchema } = require('../helper/validateAttribute');
const { Category, Product } = require('../models');

exports.getCategory = async (req, res) => {
    try{
        const response = await Category.findAll({
            include:'product_category'
        })
        res.status(200).json({ data: response, message: 'Success' })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Terjadi kesalahan dalam menampilkan list Category' });
    }
}

exports.addCategory = async (req, res) => {
    try{
        const { title } = req.body;

        const { error } = categorySchema.validate({ title });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check Category Is It Existing 
        const existingCategory = await Category.findOne({ where: { title } });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category sudah digunakan' });
        }

        // Create  New User
        const newCategory = await Category.create({ title });

        res.status(201).json({ message: 'Category berhasil ditambahkan', data: newCategory });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam menambahkan category' });
    }
}

exports.updateCategory = async (req, res) => {
    try{
        const { title } = req.body;

        const { error } = categorySchema.validate({ title });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan dalam edit category' });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Check if the category exists
      const category = await Category.findByPk(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Check if the category is associated with any products
      const associatedProducts = await Product.findAll({
        where: { categoryId },
      });
  
      if (associatedProducts.length > 0) {
        return res.status(400).json({ message: 'Category is associated with products and cannot be deleted' });
      }
  
      // Delete the category
      await category.destroy();
  
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus category' });
    }
  }
  