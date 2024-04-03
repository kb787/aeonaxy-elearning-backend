const { Resend } = require("resend");
const dotenv = require("dotenv");
const verificationModel = require("./verification-model");
const authModel = require("./auth-model");

dotenv.config();

const sender_email = process.env.sender_email;
const resend_key = process.env.resend_api_key;
const resend_object = new Resend(resend_key);

const handleForgotPassword = async (req, res) => {
  try {
    const { recieverEmail, verificationCode } = req.body;
    const oldUser = await verificationModel.findOne({
      recieverEmail,
      verificationCode,
    });
    if (!oldUser) {
      return res.json({
        message: "No such user exists",
        status: 404,
        success: false,
      });
    } else {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - oldUser.expiresIn;
      if (timeDifference < 0) {
        return res.json({
          message: "Token expired cannot change password",
          status: 409,
          success: false,
        });
      } else {
        const prevUser = await authModel.findOne({ recieverEmail });
        if (!prevUser) {
          return res.json({
            message: "No such user exists",
            status: 404,
            success: false,
          });
        }
        prevUser.userPassword = req.body.userPassword;
        await prevUser.save();
        return res.json({
          message: "Password changed successfully",
          status: 201,
          success: true,
        });
      }
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
      success: false,
    });
  }
};

const handleEmailSending = async (req, res) => {
  const { recieverEmail } = req.body;
  try {
    const validUser = authModel.find({ userEmail: req.body.recieverEmail });
    if (!validUser) {
      return res.json({
        message: "Your account does not exists do the authentication",
        status: 404,
        success: true,
      });
    }
    const passcodeGenerate = Math.floor(Math.random() * 10000 + 1);
    const otpExpiryTime = new Date().getTime() + 300 * 1000;
    await authModel.create({
      recieverEmail: recieverEmail,
      verificationCode: passcodeGenerate,
      expiresIn: otpExpiryTime,
    });
    resend_object.emails.send({
      from: sender_email,
      to: recieverEmail,
      subject: `OTP for password change`,
      html: `The passcode for changing OTP is ${passcodeGenerate}`,
    });
    return res.json({
      message: "Sent email successfully",
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

const express = require("express");
const emailSendingRouter = express.Router();
const passwordChangeRouter = express.Router();

emailSendingRouter.post("/verification/send-email", handleEmailSending);
passwordChangeRouter.post(
  "/verification/change-password",
  handleForgotPassword
);

module.exports = {
  emailSendingRouter: emailSendingRouter,
  passwordChangeRouter: passwordChangeRouter,
};
