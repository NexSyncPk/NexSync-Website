"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TeamSection extends Model {
    static associate(models) {
      TeamSection.belongsTo(models.Page, {
        foreignKey: "pageId",
        as: "page",
      });
    }
  }

  TeamSection.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TeamSection",
      tableName: "TeamSection",
    }
  );

  return TeamSection;
};
