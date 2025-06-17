"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FindUsSection extends Model {
    static associate(models) {
      FindUsSection.belongsTo(models.Page, {
        foreignKey: "pageId",
        as: "page",
      });
    }
  }
  FindUsSection.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDay: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endDay: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pageId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "FindUsSection",
    }
  );
  return FindUsSection;
};
