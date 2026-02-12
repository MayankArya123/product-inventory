const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const returnedUser = await User.findOne({ username: username });

    if (!returnedUser) {
      return res.status(401).json({ msg: "Invalid Credentails" });
    }

    const check = await bcrypt.compare(password, returnedUser.password);

    if (!check) {
      return res.status(401).json({
        msg: "Invalid Password",
      });
    }

    const payload = {
      user: {
        id: returnedUser?._id,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: returnedUser,
      token: token,
    });
  } catch (err) {
    // console.log("err login", err);
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ msg: "please write info" });
  }

  try {
    const salt = await bcrypt.genSalt(2);

    const userHashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      password: userHashPassword,
    });

    const userSaved = await user.save();

    const payload = {
      user: {
        id: user?._id,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: userSaved,
      token: token,
    });
  } catch (err) {
    // console.log("err login in regsiter", err);
  }
};

const getLoggedInUser = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    user,
  });

  return res.json({
    user: user,
  });
};

module.exports = { login, register, getLoggedInUser };
