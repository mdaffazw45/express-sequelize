'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, { through: models.Order, foreignKey: 'productId'})
      // Hubungan one-to-many antara Product dan Category
      Product.belongsTo(models.Category, {
        as: 'product_category',
        foreignKey: {
          name: 'categoryId'
        }
      })
    }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    stok: DataTypes.INTEGER,
    harga: DataTypes.FLOAT,
    categoryId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};