'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('rols', [
      {
        name: 'admin',
      },
      {
        name: 'user',
      }
    ],
      {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('rols', null, {});

  }
};
