"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HeroSections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pageId: {
        type: Sequelize.INTEGER,
      },
      heroImage: {
        type: Sequelize.STRING,
      },
      noOfProjects: {
        type: Sequelize.INTEGER,
      },
      noOfClients: {
        type: Sequelize.INTEGER,
      },
      satisfactionPercentage: {
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("HeroSections");
  },
};
