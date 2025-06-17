"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable("JobPostings", "JobPostingSection");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable("JobPostingSection", "JobPostings");
  },
};
