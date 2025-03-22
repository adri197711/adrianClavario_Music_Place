'use strict';
const productsJson = require('../../db/products.json');
const images = productsJson.map(({ id, image }) => {
  return {
    name: image,
    productId: id,
    createdAt: new Date,
    updatedAt: new Date
  }
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Images', images,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Images', null, {});
    
  }
};
