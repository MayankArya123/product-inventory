const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("db connected");
  } catch (err) {
    console.log("errror connecting db", err);
  }
};

module.exports = connectDb;
