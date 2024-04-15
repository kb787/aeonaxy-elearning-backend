require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("./config");
const node_env = process.env.node_env;

const sequelize = new Sequelize(config[node_env]);
module.exports = sequelize;
