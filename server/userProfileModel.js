const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const {
  wlan_ipv4_address,
  neon_database_name,
  neon_profile_password,
  neon_username,
  pg_port,
} = process.env;

const sequelize = new Sequelize(
  neon_database_name,
  neon_username,
  neon_profile_password,
  {
    host: wlan_ipv4_address,
    port: pg_port,
    dialect: "postgres",
  }
);
// sequelize.sync();
let userProfileModel;
if (sequelize.models.profiles) {
  userProfileModel = sequelize.models.profiles;
}

userProfileModel = sequelize.define("profiles", {
  profile_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  emailaddress: {
    type: DataTypes.STRING,
  },
  userage: {
    type: DataTypes.INTEGER,
  },
  profileimageurl: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   try {
//     await sequelize.sync();
//     console.log("Database synchronized successfully!");
//   } catch (error) {
//     console.error("Error synchronizing database:", error);
//   }
// })();

module.exports = userProfileModel;
