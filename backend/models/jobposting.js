'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobPosting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobPosting.init({
    title: DataTypes.STRING,
    position: DataTypes.STRING,
    description: DataTypes.TEXT,
    jobType: DataTypes.STRING,
    domain: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    requirements: DataTypes.JSON,
    isArchived: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'JobPosting',
  });
  return JobPosting;
};