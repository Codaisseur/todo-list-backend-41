"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "washing the car",
          deadline: "tomorrow",
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "doing the laundry",
          deadline: "next week",
          important: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "going to the doctor",
          deadline: "in 2 days",
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("todoItems", null, {});
  },
};
