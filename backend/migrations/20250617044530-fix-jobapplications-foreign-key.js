"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Make jobPostingsId nullable
    await queryInterface.changeColumn("JobApplications", "jobPostingsId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Add the correct foreign key constraint
    await queryInterface.addConstraint("JobApplications", {
      fields: ["jobPostingsId"],
      type: "foreign key",
      name: "jobapplications_jobPostingsId_fk", // you can name this anything
      references: {
        table: "JobPostingSection",
        field: "id",
      },
      onDelete: "SET NULL", // or 'CASCADE'
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the FK constraint
    await queryInterface.removeConstraint(
      "JobApplications",
      "jobapplications_jobPostingsId_fk"
    );

    // Revert column to NOT NULL
    await queryInterface.changeColumn("JobApplications", "jobPostingsId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
