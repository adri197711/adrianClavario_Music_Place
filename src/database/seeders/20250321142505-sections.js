'use strict';

const sectionsJSON = require('../../db/sections.json');

const sections = sectionsJSON.map(section => ({
  name: section,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Insertar las secciones
      await queryInterface.bulkInsert('sections', sections, {});
      console.log(`${sections.length} sections inserted.`);
    } catch (error) {
      console.error('Error inserting sections:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Eliminar las secciones usando el nombre de las secciones en el JSON
      await queryInterface.bulkDelete('sections', {
        name: { [Sequelize.Op.in]: sectionsJSON } // Aquí usamos el operador IN
      }, {});
      console.log('Sections deleted.');
    } catch (error) {
      console.error('Error deleting sections:', error);
    }
  }
};



// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
   
//     await queryInterface.bulkInsert(
//        "Sections",
//        [
//          {
//            name: "Guitarras",
//            createdAt : new Date(),
//            updatedAt : new Date()
//          },
//          {
//            name: "Bajos",
//            createdAt : new Date(),
//            updatedAt : new Date()
//          },
//          {
//            name: "Baterias",
//            createdAt : new Date(),
//            updatedAt : new Date()
//          },
//          {
//            name: "Teclados",
//            createdAt : new Date(),
//            updatedAt : new Date()
//          },
//          {
//            name: "Accesorios",
//            createdAt : new Date(),
//            updatedAt : new Date()
//          },
//          {
//            name: "Amplificadores",
//            createdAt : new Date(),
//            updatedAt : new Date()
//          },
//          {
//            name: "Audio",
//            createdAt : new Date(),
//            updatedAt : new Date()
//          }
//        ],
//        {}
//      );
//   },

//   async down (queryInterface, Sequelize) {
//   await queryInterface.bulkDelete('Sections', null, {});
     
//   },
// };
