"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("JobApplications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastEducation: {
        type: Sequelize.ENUM(
          "intermediate",
          "diploma",
          "undergraduate",
          "masters"
        ),
        allowNull: false,
      },
      expectedSalary: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      yearOfPassing: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      availability: {
        type: Sequelize.ENUM("remote", "hybrid", "onsite"),
        allowNull: false,
      },
      jobPostingsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "JobPostings",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("JobApplications");
  },
};
