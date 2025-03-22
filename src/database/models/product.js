'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
      static associate(models) {
       Product.belongsTo(models.Category,{
        as: 'category',
        foreignKey: 'categoryId'
      });
      Product.belongsTo(models.Section,{
        as: 'section',
        foreignKey: 'sectionId'
      });

      Product.belongsTo(models.Brand,{
         as: 'brands',
         foreignKey: 'brandId'
      });
      Product.hasMany(models.Image, {
        as: 'images',
        foreignKey: 'productId',
      });
    };
    }
  
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};