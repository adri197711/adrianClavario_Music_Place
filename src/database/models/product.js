'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {

      Product.belongsTo(models.Brand, {
        as: 'brand',
        foreignKey: 'brandId',
      });

   
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId',
      });

    
      Product.belongsTo(models.Section, {
        as: 'section',
        foreignKey: 'sectionId',
      });

    
      Product.hasMany(models.Image, {
        as: "images",
        foreignKey:'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          len: [1, 255], 
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  
      sectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
     
   
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
