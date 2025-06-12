"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JobPostings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      position: {
        type: Sequelize.ENUM("full-time", "part-time", "intern", "contract"),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      jobType: {
        type: Sequelize.ENUM("remote", "hybrid", "onsite"),
      },
      domain: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.INTEGER,
      },
      requirements: {
        type: Sequelize.JSON,
      },
      isArchived: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("JobPostings");
  },
};
