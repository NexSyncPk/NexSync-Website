"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("Teams", "TeamSection");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("TeamSection", "Teams");
  },
};
