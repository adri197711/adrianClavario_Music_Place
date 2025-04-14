'use strict';

const { DATE } = require('sequelize');
const categoriesJson = require('../../db/categories.json');
const categories = categoriesJson.map(category => {
  return {
    name: category,
    createdAt: new Date,
    updatedAt: new Date,
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', categories,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
 await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
