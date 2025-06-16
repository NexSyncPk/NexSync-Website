"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HeroSection extends Model {
    static associate(models) {
      HeroSection.belongsTo(models.Page, {
        foreignKey: "pageId",
        as: "page",
      });
    }
  }
  HeroSection.init(
    {
      pageId: {
        type: DataTypes.INTEGER,
      },
      heroImage: {
        type: DataTypes.STRING,
      },
      noOfProjects: {
        type: DataTypes.INTEGER,
      },
      noOfClients: {
        type: DataTypes.INTEGER,
      },
      satisfactionPercentage: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "HeroSection",
      tableName: "HeroSections",
      underscored: false,
    }
  );
  return HeroSection;
};
