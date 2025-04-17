const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/admin');
const adminUsersController = require('../controllers/adminCtl');
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const id = req.params.id;
      const datetime = new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
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
      fileSize: 5 * 1024 * 1024 },
  }); 

router.post('/admin/login', adminUsersController.loginAdmin);
router.get('/authadmin/check-admin', adminUsersController.checkAuth);
router.post('/admin/logout', authenticateToken, adminUsersController.logout);
router.get('/admin/protected', authenticateToken, adminUsersController.protectedRoute);
router.get('/admin/search', adminUsersController.searchAdminUsers);
// router.get('/admin-users', authenticateToken, adminUsersController.getAllAdminUsers);
router.get('/admin-users', authenticateToken, adminUsersController.getAllAdminUsers);
router.post('/admin/create-user', authenticateToken,upload.single("Avatar"), adminUsersController.createAdminUser);
router.put("/admin-users/:id",authenticateToken, upload.single("Avatar"), adminUsersController.updateAdminUser);
router.get('/admin-users/:id', authenticateToken, adminUsersController.getAdminUserID);
// router.put('/admin-users/:id', authenticateToken, adminUsersController.updateAdminUser);
router.delete('/admin-users/:id', authenticateToken, adminUsersController.deleteAdminUser);

module.exports = router;