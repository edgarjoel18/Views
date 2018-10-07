'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Posts', [{
    title: 'Dummy post',
    body: 'first dummy post',
    createdAt: new Date(),
    updatedAt: new Date()
    }, {title: ' Second Dummy post',
    body: 'second dummy post',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      //Add reverting commands here.
      //Return a promise to correctly handle asynchronicity.

      //Example:
      
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
