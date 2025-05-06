'use strict';
const productsJson = require('../../db/products.json');
const {randomNumber} = require('../../utils')
const products = productsJson.map(({ name, description, price, discount, brand, category, section }) => {
  return {
    name,
    description,
    price,
    discount: discount || 0,
    brandId: brand, 
    categoryId: category,
    sectionId: section,
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', products, {});
  },

  async down (queryInterface, Sequelize) {
   
 await queryInterface.bulkDelete('products', null, {});
     
  }
};
