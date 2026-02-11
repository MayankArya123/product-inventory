const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getUserProducts,
  getProduct,
} = require("../controllers/product");

const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getUserProducts);
router.get("/:id", getProduct);
router.post("/", upload.array("images"), createProduct);
router.put("/:id", upload.array("images"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
