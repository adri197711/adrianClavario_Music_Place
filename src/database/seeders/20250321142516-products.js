'use strict';
const productsJson = require('../../db/products.json');
const {randomNumber} = require('../../utils')
const products=productsJson.map(({name,description,price,discount}) =>{
return {
  name,
  description,
  price,
  discount,
  categoryId:randomNumber(2),
  sectionId:randomNumber(2),
  createdAt: new Date,
  updatedAt: new Date
}
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products", products)
  },

  async down (queryInterface, Sequelize) {
   
 await queryInterface.bulkDelete('products', null, {});
     
  }
};
