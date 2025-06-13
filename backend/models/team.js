"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      // define association here
    }
  }

  Team.init(
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
    },
    {
      sequelize,
      modelName: "Team",
    }
  );

  return Team;
};
