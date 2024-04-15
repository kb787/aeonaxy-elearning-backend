"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

let userProfileModel = sequelize.define(
  "user_profiles",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    emailaddress: {
      type: Sequelize.STRING,
    },
    userage: {
      type: Sequelize.INTEGER,
    },
    profileimageurl: {
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
    tableName: "user_profiles",
  }
);

module.exports = userProfileModel;
