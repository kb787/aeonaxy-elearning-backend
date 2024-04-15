"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
let courseModel = sequelize.define(
  "user_courses",
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
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    tableName: "user_courses",
  }
);

module.exports = courseModel;
