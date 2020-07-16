"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "Matias",
        email: "matias@codaissuer.com",
        password: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rein",
        email: "rein@codaissuer.com",
        password: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
