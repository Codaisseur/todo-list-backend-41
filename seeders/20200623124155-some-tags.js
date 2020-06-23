"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "Urgent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Home",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("tags", null, {});
  },
};
