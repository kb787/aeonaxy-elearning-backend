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

let courseModel;
if (sequelize.models.courses) {
  courseModel = sequelize.models.courses;
}

courseModel = sequelize.define("courses", {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  enrolled_users_id: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  users_count: {
    type: DataTypes.INTEGER,
  },
  coursename: {
    type: DataTypes.STRING,
  },
  coursecategory: {
    type: DataTypes.STRING,
  },
  courselevel: {
    type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
  },
  coursevideolink: {
    type: DataTypes.STRING,
  },
});

module.exports = courseModel;
