'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      // Relación con User
      Rol.hasMany(models.User, {
        as: 'users',
        foreignKey: 'rolId' // Asegurate de que en User sea 'rolId'
      });
    }
  }
  Rol.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'rols',
    timestamps: true
  });
  return Rol;
};