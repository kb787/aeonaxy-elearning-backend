const dotenv = require("dotenv");
dotenv.config();
const authModel = require("../mongodb-models/auth-model");

const admin_email = process.env.admin_email;
const admin_password = process.env.admin_password;

const handleValidateAdmin = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  if (userEmail !== admin_email) {
    return res.json({ message: "Invalid email for admin", status: 404 });
  } else if (userPassword !== admin_password) {
    return res.json({ message: "Invalid credentials for admin", status: 404 });
  } else {
    next();
  }
};

module.exports = handleValidateAdmin;
