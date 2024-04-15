"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

let courseModel = sequelize.define(
  "courseModels",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    enrolled_users_id: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    users_count: {
      type: Sequelize.INTEGER,
    },
    coursename: {
      type: Sequelize.STRING,
    },
    coursecategory: {
      type: Sequelize.STRING,
    },
    courselevel: {
      type: Sequelize.ENUM("beginner", "intermediate", "advanced"),
    },
    coursevideolink: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    modelName: "courseModels",
  }
);

module.exports = courseModel;
