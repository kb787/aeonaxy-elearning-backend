const cookieModel = require("../mongodb-models/cookie-model");

const handleCreateCookie = async (userName, userEmail) => {
  try {
    await cookieModel.create({ userName: userName, userEmail: userEmail });
  } catch (error) {
    console.log(`Unable to process your request due to error ${error}`);
  }
};

const handleValidateCookie = async (req, res, next) => {
  try {
    const { userName, userEmail } = req.body;
    const findCookie = await cookieModel.findOne({ userName: userName });
    if (!findCookie) {
      return res.json({ message: "No cookie found", status: 404 });
    } else if (findCookie.userEmail !== userEmail) {
      return res.json({ message: "Invalid cookie", status: 409 });
    } else {
      next();
    }
  } catch (error) {
    return res.json({
      message: `Unable to fetch cookie due to error ${error}`,
    });
  }
};

module.exports = {
  handleCreateCookie: handleCreateCookie,
  handleValidateCookie: handleValidateCookie,
};
