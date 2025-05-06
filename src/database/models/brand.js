'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {

    static associate(models) {
      Brand.hasMany(models.Product, {
        as: "products",
        foreignKey: "brandId",
      });
    }
  }

  Brand.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands',
    timestamps: true
  });
  return Brand;
};