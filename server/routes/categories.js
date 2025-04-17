const express = require("express");
const router = express.Router();
const Categories = require("../controllers/categories");
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

// console.log('Categories:', Categories); // Debug: Kiểm tra cartController
// console.log('Categories.addToCart:', Categories.createCategory); // Debug: Kiểm tra addToCart

// Category Routes

router.get("/category", Categories.getAllCategories);
router.post(
  "/category/create",
  upload.single("imgCate"), 
  Categories.createCategory
);
// router.get('/category', Categories.getAllCategories);
router.get("/category/:id", validateId, Categories.getCategoryById);
router.put("/category/:id", validateId,upload.single("imgCate"), Categories.editCategoryById);
router.put("/statusCaterory/:id",  Categories.editStatusCategoryById);

router.delete("/category/:id", validateId, Categories.deleteCategoryById);
router.get("/category/search", validateSearchQuery, Categories.searchCategory);

module.exports = router;
