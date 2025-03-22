"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
const path = require("path");
const directory = path.join(__dirname, "../../db/users.json"); 
const { readFile, parseFile } = require("../../utils/filesystem");
const users = parseFile(readFile(directory)); 

users.map((user) => {
  user.updatedAt = new Date();
  user.createdAt = new Date();
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {}); 
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {}); 
  },
};
