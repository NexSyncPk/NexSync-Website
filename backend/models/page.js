"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    static associate(models) {
      Page.hasOne(models.HeroSection, { foreignKey: "pageId" });
      Page.hasOne(models.TeamSection, { foreignKey: "pageId" });
    }
  }
  Page.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Page",
    }
  );
  return Page;
};
