const Product = require("../schemas/product");
const slugify = require("slugify");

const createProduct = async (req, res) => {
  const userId = req.user?.id;

  const { name, price, description } = req.body;

  var slug = slugify(name, {
    lower: true,
    strict: true,
  });

  const existingProduct = await Product.findOne({ slug });

  if (existingProduct) {
    slug = slug + "-" + Date.now();
  }

  try {
    const createdProduct = await Product.create({
      name,
      price,
      description,
      slug,
      user: userId,
    });

    res.status(200).json(createdProduct);
  } catch (err) {
    console.log("error in fetching products", err);
  }
};

const updateProduct = async (req, res) => {
  try {
  } catch (err) {}
};

const getUserProducts = async (req, res) => {


  const userId = req.user?.id;

  try {


    const userProducts = await Product.find({
      user: userId,
    });

    res.status(200).json(userProducts);
  } catch (err) {
    console.log("error in fetching products", err);
  }
};

const deleteProduct = async (req, res) => {
  try {
  } catch (err) {}
};

const getProduct = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts,
  getProduct,
};
