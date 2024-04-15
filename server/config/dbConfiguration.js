const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
dotenv.config();
const mongodb_connection_string = process.env.mongodb_connection_string;

const mongodbDatabaseConnection = async () => {
  try {
    await mongoose.connect(mongodb_connection_string);
    console.log(`Successfully connected to mongodb database`.bgGreen);
  } catch (error) {
    console.log(`Unable to connect to database due to error ${error}`);
  }
};

module.exports = mongodbDatabaseConnection;
