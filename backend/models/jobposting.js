"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class JobPostingSection extends Model {
    static associate(models) {
      JobPostingSection.hasMany(models.JobApplications, {
        foreignKey: "jobPostingsId",
        as: "applications",
      });
      JobPostingSection.belongsTo(models.Page, {
        foreignKey: "pageId",
        as: "page",
      });
    }
  }

  JobPostingSection.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requirements: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "JobPostingSection",
    }
  );

  return JobPostingSection;
};
