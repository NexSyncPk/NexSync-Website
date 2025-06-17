"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("FindUsSections", [
      {
        address: "123 Innovation Street, San Francisco, CA 94105",
        startDay: "Monday",
        endDay: "Friday",
        startTime: "09:00",
        endTime: "17:00",
        isDeleted: false,
        pageId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FindUsSections", null, {});
  },
};
