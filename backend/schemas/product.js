const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    isRequired: true,
  },
  metaTitle: {
    type: String,
    reuired: true,
  },
  description: {
    type: String,
    isRequired: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: [{ type: String }],
  slug: { type: String, reuired: true, unique: true },
  price: {
    type: Number,
    isRequired: true,
  },
  discountedPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("product", productSchema);
