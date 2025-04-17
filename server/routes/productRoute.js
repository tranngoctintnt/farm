const express = require("express");
const router = express.Router();
const Products = require("../controllers/productCtl");
const multer = require("multer");
const path = require("path");

// Middleware to validate ID parameter
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  // console.log(id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }
  req.params.id = id; // Ensure ID is an integer

  // console.log(req.params.id);
  next();
};

// Middleware to validate search query
const validateSearchQuery = (req, res, next) => {
  if (!req.query.q) {
    return res.status(400).json({
      success: false,
      message: 'Search query parameter "q" is required',
    });
  }
  next();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    const datetime = new Date()
      .toISOString()
      .replace(/[-:.T]/g, "")
      .slice(0, 14);
    const originalName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);
    const uniqueFilename = `${id}_${datetime}_${originalName}${ext}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const isImage = file.mimetype.startsWith("image/");
    if (!isImage) return cb(new Error("Only image files are allowed"), false);
    cb(null, true);
  },
  limits: {
    fieldSize: 1024 * 1024 * 10,
    fileSize: 5 * 1024 * 1024,
  },
});

// Category Routes

router.get("/product", Products.getAllProducts);
router.get("/productuser", Products.getAllProductsForUser);

router.post(
  "/product/create",
  upload.array("imgProduct",8),
  Products.createProduct
);
// router.get('/category', Products.getAllProducts);
router.get("/product/:id", validateId, Products.getProductById);
router.put("/product/:id", validateId,upload.array("imgProduct",8), Products.editProductById);
router.put("/statusProduct/:id", Products.editStatusProductById);

router.delete("/product/:id", validateId, Products.deleteProductById);
router.get("/product/search", validateSearchQuery, Products.searchProduct);

module.exports = router;
