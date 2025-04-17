const express = require('express');
const router = express.Router();
const  {authenticateTokenUser}  = require('../middleware/user');
const { authenticateToken } = require('../middleware/admin');

const UsersController = require('../controllers/userCtl');
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
router.post('/user/register',upload.single("avatar"), UsersController.registerUser);
router.post('/user/verify-otp', UsersController.verifyOTP);
router.post('/user/resendOtp', UsersController.resendOTP);
router.get('/auth/checkuser', UsersController.checkAuthUser);
router.post('/user/login', UsersController.loginUser);


// Đăng nhập bằng Google
router.get("/auth/google", UsersController.googleLogin);
router.get("/auth/google/callback", UsersController.googleCallback);

// Route bảo vệ: yêu cầu đăng nhập và kiểm tra token
router.get("/protected", UsersController.verifyToken, (req, res) => {
  res.json({ message: `Xin chào ${req.user.username}, đây là dữ liệu bảo vệ!` });
});
router.post('/user/logout', authenticateTokenUser, UsersController.logout);
router.get('/user/protected', authenticateTokenUser, UsersController.protectedRoute);
router.get('/user/search', UsersController.searchAdminUsers);
// router.get('/admin-users', authenticateTokenUser, UsersController.getAllAdminUsers);
router.get('/users/getlist',authenticateToken, UsersController.getAllCustomerUsers);

router.put("/users/:id",authenticateTokenUser, upload.single("avatar"), UsersController.updateAdminUser);
router.get('/user/:id', authenticateTokenUser, UsersController.getCustomerUserID);
// router.put('/admin-users/:id', authenticateTokenUser, UsersController.updateAdminUser);
router.delete('/users/:id', authenticateTokenUser, UsersController.deleteAdminUser);

module.exports = router;