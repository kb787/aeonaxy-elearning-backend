"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courseModels", {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("courseModels");
  },
};
