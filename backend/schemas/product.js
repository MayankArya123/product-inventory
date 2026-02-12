const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  metaTitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: [{ type: String }],
  slug: { type: String, required: true, unique: true },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("product", productSchema);
