const { body, validationResult } = require("express-validator");

exports.productValidation = [
  body("metaTitle")
    .optional({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Meta title must be at least 3 characters"),

  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  let allErrors = [];

  if (!errors.isEmpty()) {
    allErrors = errors.array();
  }

  const isUpdate = req.params.id;

  const existingImages = req.body.existingImages
    ? Array.isArray(req.body.existingImages)
      ? req.body.existingImages
      : [req.body.existingImages]
    : [];
  const newImages = req.files || [];

  const totalImages = existingImages?.length + newImages?.length;

  if (!isUpdate && newImages.length === 0) {
    allErrors.push({
      type: "field",
      msg: "At least one image is required",
      path: "images",
      location: "body",
    });
  }

  if (isUpdate && totalImages === 0) {
    allErrors.push({
      type: "field",
      msg: "At least one image is required",
      path: "images",
      location: "body",
    });
  }

  if (allErrors.length > 0) {
    return res.status(400).json({
      errors: allErrors,
    });
  }

  next();
};
