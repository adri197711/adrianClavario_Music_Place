'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
   
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId',
      });

    
      Product.belongsTo(models.Section, {
        as: 'section',
        foreignKey: 'sectionId',
      });

        
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    
      image: {
        type: DataTypes.STRING,
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
