"use strict";
const { Model } = require("sequelize");
const sequelize = require("../config/database");
const { Sequelize } = require("sequelize");

let userProfileModel = sequelize.define(
  "userProfiles",
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
    modelName: "userProfiles",
  }
);

module.exports = userProfileModel;
