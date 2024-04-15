const authModel = require("../mongodb-models/auth-model");
const jwt = require("jsonwebtoken");
const { handleCreateCookie } = require("../helpers/cookie-handler");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
dotenv.config();

const token_secret_key = process.env.secret_key;

const handleSignUp = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  if (!userName || !userEmail || !userPassword) {
    return res.json({
      message: "Entering all fields is mandatory",
      status: 409,
      success: false,
    });
  }
  try {
    const existingUser = await authModel.findOne({
      userEmail: req.body.userEmail,
    });
    if (existingUser) {
      return res.json({
        message: "User already exists , Sign In to your account",
        status: 409,
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const password = req.body.userPassword;
    const hashedPassword = await bcryptjs.hash(password, salt);
    await authModel.create({
      userName: userName,
      userEmail: userEmail,
      userPassword: hashedPassword,
    });
    return res.json({
      message: "User Created successfully",
      status: 201,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: `Unable to create user due to error ${error}`,
      status: 500,
      success: false,
    });
  }
};

const handleSignIn = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail || !userPassword) {
    return res.json({
      message: "Entering all fields is mandatory",
      status: 409,
      success: false,
    });
  }
  try {
    const oldUser = await authModel.findOne({ userEmail: req.body.userEmail });
    if (!oldUser) {
      return res.json({
        message: "No such account exists",
        status: 404,
        success: false,
      });
    }
    const passwordComparison = await bcryptjs.compare(
      userPassword,
      oldUser.userPassword
    );
    if (!passwordComparison) {
      return res.json({
        message: "Invalid credentials",
        status: 409,
        success: false,
      });
    } else {
      const responseObject = handleCreateCookie(
        oldUser.userName,
        oldUser.userEmail
      );
      const sendingResponseToken = {
        userName: oldUser.userName,
        userEmail: oldUser.userEmail,
      };
      const token = jwt.sign({ sendingResponseToken }, token_secret_key, {
        expiresIn: "1d",
      });
      return res.json({
        message: "User signin successfull and cookie created successfully",
        status: 201,
        success: true,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: `Server side error ${error} occured`,
      status: 500,
      success: false,
    });
  }
};

const express = require("express");
const signupRouter = express.Router();
const signinRouter = express.Router();

signupRouter.post("/auth/signup", handleSignUp);
signinRouter.post("/auth/signin", handleSignIn);

module.exports = {
  signupRouter: signupRouter,
  signinRouter: signinRouter,
};
