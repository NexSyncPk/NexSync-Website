"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("Teams", "TeamSection");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("TeamSection", "Teams");
  },
};
