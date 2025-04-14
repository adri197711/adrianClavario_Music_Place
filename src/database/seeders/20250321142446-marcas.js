'use strict';

const marcasJSON = require('../../db/marcas.json');

const brands = marcasJSON.map(brand => ({
  name: brand,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('brands', brands, {});
      console.log(`${brands.length} brands inserted.`);
    } catch (error) {
      console.error('Error inserting brands:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('brands', {
        name: marcasJSON
      }, {});
      console.log('Brands deleted.');
    } catch (error) {
      console.error('Error deleting brands:', error);
    }
  }
};
