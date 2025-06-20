"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TestimonialSection extends Model {
    static associate(models) {
      TestimonialSection.belongsTo(models.Page, {
        foreignKey: "pageId",
        as: "page",
      });
    }
  }

  TestimonialSection.init(
    {
      pageId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
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
      modelName: "TestimonialSection",
      tableName: "TestimonialSection",
    }
  );

  return TestimonialSection;
};
