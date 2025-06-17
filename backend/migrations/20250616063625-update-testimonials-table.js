"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("Testimonals", "TestimonialSection");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("TestimonialSection", "Testimonals");
  },
};
