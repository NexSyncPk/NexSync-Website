"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Testimonal extends Model {
    static associate(models) {
      // define association here
    }
  }

  Testimonal.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Testimonal",
    }
  );

  return Testimonal;
};
