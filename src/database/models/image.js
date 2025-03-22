'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
   
    static associate(models) {
      Image.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    };
    }
  
  Image.init({
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};