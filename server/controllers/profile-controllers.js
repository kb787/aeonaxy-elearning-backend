const userProfileModel = require("../models/userprofile");
const handleValidateAdmin = require("../helpers/super-user-validation");

const handleUserProfileCreation = async (req, res) => {
  const { firstname, lastname, emailaddress, userage, profileimageurl } =
    req.body;
  try {
    await userProfileModel.build({
      firstname: firstname,
      lastname: lastname,
      emailaddress: emailaddress,
      userage: userage,
      profileimageurl: profileimageurl,
    });
    return res.json({
      message: "User created successfully",
      status: 201,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
      success: false,
    });
  }
};

const handleUserProfileDeletion = async (req, res) => {
  const { profile_id } = req.params;
  try {
    const expectedUser = await userProfileModel.findByPk(profile_id);
    if (!expectedUser) {
      return res.json({ message: "Unable to find such user", status: 404 });
    } else {
      await expectedUser.destroy();
      return res.json({ message: "User deleted successfully", status: 201 });
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const handleFindUserProfileById = async (req, res) => {
  const { profile_id } = req.params;
  try {
    const expectedUser = await userProfileModel.findByPk(profile_id);
    if (!expectedUser) {
      return res.json({ message: "No such profile exists", status: 404 });
    } else {
      return res.send(expectedUser);
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const handleFindAllUsers = async (req, res) => {
  try {
    const searchResponse = await userProfileModel.findAll();
    if (!searchResponse) {
      return res.json({ message: "No such users found", status: 404 });
    } else {
      return res.send(searchResponse);
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const handleUpdateUserProfileById = async (req, res) => {
  const { profile_id } = req.params;
  const { firstname, lastname, emailaddress, userage, profileimageurl } =
    req.body;
  try {
    const requiredUser = await userProfileModel.findByPk(profile_id);
    if (!requiredUser) {
      return res.json({ message: "No such profile found", status: 404 });
    } else {
      userProfileModel.set({
        firstname: firstname,
        lastname: lastname,
        emailaddress: emailaddress,
        userage: userage,
        profileimageurl: profileimageurl,
      });
      await userProfileModel.save();
      return res.json({
        message: "Successfully updated the user profile details",
        status: 201,
      });
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const express = require("express");
const profilePostRouter = express.Router();
const profileGetIndividualRouter = express.Router();
const profileGetAllRouter = express.Router();
const profileDeleteRouter = express.Router();
const profileUpdateRouter = express.Router();

profilePostRouter.post(
  "/profiles/create-user-profile",
  handleUserProfileCreation
);
profileGetIndividualRouter.get(
  "/profiles/get-user-profile/:id",
  handleFindUserProfileById
);
profileGetAllRouter.get(
  "/profiles/get-all-users",
  handleValidateAdmin,
  handleFindAllUsers
);
profileDeleteRouter.delete(
  "/profiles/delete-user-profile/:id",
  handleUserProfileDeletion
);
profileUpdateRouter.patch(
  "/profiles/update-user-profile/:id",
  handleUpdateUserProfileById
);

module.exports = {
  profilePostRouter: profilePostRouter,
  profileGetAllRouter: profileGetAllRouter,
  profileGetIndividualRouter: profileGetIndividualRouter,
  profileUpdateRouter: profileUpdateRouter,
  profileDeleteRouter: profileDeleteRouter,
};
