const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

const checkAuth = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "to valid token",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const returnedUser = await User.findById(decoded?.user?.id);
    req.user = returnedUser;
    next();
  } catch (err) {
    console.log("error in middleware", err);
  }
};

module.exports = checkAuth;
