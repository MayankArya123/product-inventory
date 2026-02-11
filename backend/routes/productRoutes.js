const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getUserProducts,
  getProduct,
} = require("../controllers/product");

const router = express.Router();

router.get("/", getUserProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put('/:id',updateProduct)
router.delete("/:id", deleteProduct);


module.exports = router;
