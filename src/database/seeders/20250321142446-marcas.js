'use strict';

const marcasJSON = require('../../db/marcas.json');
const brands = marcasJSON.map(brand => {
  return {
    name: brand,
    createdAt: new Date,
    updatedAt: new Date,
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('brands', brands,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
 await queryInterface.bulkDelete('brands', null, {});
     
  }
};
