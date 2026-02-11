const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    isRequired: true,
  },
  password: {
    type: String,
    isRequired: true,
  },
});

module.exports = mongoose.model("user", userSchema);
