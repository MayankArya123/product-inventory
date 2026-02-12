const Product = require("../schemas/product");
const slugify = require("slugify");

const createProduct = async (req, res) => {
  const userId = req.user?.id;

  const { name, price, description } = req.body;

  const files = req.files;

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
      images: files.map((file) => file.filename),
    });

    return res.status(200).json(createdProduct);
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: "validation error",
    });
  }
};

const updateProduct = async (req, res) => {
  const productId = req?.params?.id;

  const { name, price, description } = req.body;

  const files = req.files;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  const existingImages = req.body.existingImages
    ? Array.isArray(req.body.existingImages)
      ? req.body.existingImages
      : [req.body.existingImages]
    : [];

  const filteredImages = product.images.filter((productImg) => {
    if (existingImages?.includes(productImg)) {
      return productImg;
    }
  });

  const newImages = files.map((file) => file.filename);

  const updatedImages = [...filteredImages, ...newImages];

  const updateData = {
    name,
    price,
    description,
    images: updatedImages,
  };

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      },
    );

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ success: false, message: err?.message });
  }
};

const getUserProducts = async (req, res) => {
  const userId = req.user?.id;

  try {
    const userProducts = await Product.find({
      user: userId,
    });

    return res.status(200).json(userProducts);
  } catch (err) {
    return res.status(500).json({ success: false, message: err?.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params?.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    return res.status(200).json(deletedProduct);
  } catch (err) {
    return res.status(500).json({ success: false, message: err?.message });
  }
};

const getProduct = async (req, res) => {
  const productId = req.params?.id;

  try {
    const product = await Product.findOne({ _id: productId });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ success: false, message: err?.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts,
  getProduct,
};
