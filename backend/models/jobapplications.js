"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class JobApplications extends Model {
    static associate(models) {
      JobApplications.belongsTo(models.JobPosting, {
        foreignKey: "jobPostingsId",
        as: "jobPosting",
      });
    }
  }

  JobApplications.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastEducation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expectedSalary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      yearOfPassing: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true, // optional
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobPostingsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "JobApplications",
    }
  );

  return JobApplications;
};
