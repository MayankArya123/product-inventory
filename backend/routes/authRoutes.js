const express = require("express");
const { login, register, getLoggedInUser } = require("../controllers/auth");
const checkAuth = require("../middleware/auth");
const {
  registerValidation,
  validate,
} = require("../middleware/register-validation");

const router = express.Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", login);
router.get("/get-user", checkAuth, getLoggedInUser);

module.exports = router;
