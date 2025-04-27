'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {

    static associate(models) {
      Address.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onDelete: 'CASCADE',
      });
    }
  }
  Address.init({
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    city: DataTypes.STRING,
    code: DataTypes.STRING,
    province: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};