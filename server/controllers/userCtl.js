const express = require("express");
const cookieParser = require("cookie-parser");
// const sql = require("mssql");
// const { getConnection, sql } = require('../config/dbConfig');
const transporter = require("../config/emailConfig");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer"); // Thư viện gửi email
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const app = express();
app.use(cookieParser());
app.use(express.json());
const {
  sql,
  JWT_SECRET,
  getConnection,
  updateRefreshToken,
  isTokenBlacklisted,
  blacklistToken,
} = require("../config/db");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "ngoctin10a11@gmail.com", // Thay bằng email của bạn
//     pass: "csjc srtv pvuf gtgg",
//     // Thay bằng mật khẩu ứng dụng (App Password nếu dùng Gmail)
//   },
// });

// Cấu hình Passport cho Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Thêm vào .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Thêm vào .env
      callbackURL: "http://localhost:3000/api/auth/google/callback",
      scope: ["profile", "email"], // Đảm bảo lấy profile và email
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      try {
        const pool = await getConnection();
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const fullName = profile.displayName;
        const avatar = "/user.jpg";

        // Kiểm tra xem người dùng đã tồn tại với googleId hoặc email
        let user = await pool
          .request()
          .input("googleId", sql.NVarChar, googleId)
          .input("email", sql.NVarChar, email)
          .query(
            "SELECT * FROM Customers WHERE googleId = @googleId OR email = @email"
          );

        if (user.recordset.length > 0) {
          user = user.recordset[0];
          // Cập nhật googleId nếu người dùng chỉ có email trước đó
          if (!user.googleId) {
            await pool
              .request()
              .input("id", sql.Int, user.idCustomer)
              .input("googleId", sql.NVarChar, googleId)
              .query("UPDATE Customers SET googleId = @googleId WHERE idCustomer = @id");
          }
        } else {
          // Tạo người dùng mới
          const result = await pool
            .request()
            .input("fullName", sql.NVarChar, fullName)
            .input("email", sql.NVarChar, email)
            .input("avatar", sql.NVarChar, avatar)
            .input("googleId", sql.NVarChar, googleId)
            .input("isEmailVerified", sql.Bit, true) // Google đã xác minh email
            .query(`
              INSERT INTO Customers (fullName, email, avatar, googleId, isEmailVerified, createdAt, updatedAt)
              VALUES (@fullName, @email, @avatar, @googleId, @isEmailVerified, GETDATE(), GETDATE());
              SELECT SCOPE_IDENTITY() as id;
            `);
          user = {
            idCustomer: result.recordset[0].id,
            fullName,
            email,
            avatar,
            googleId,
            phone: null,
          };
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize và deserialize user để lưu vào session (nếu cần)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Tạo OTP 6 số
};

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ error: "Chưa đăng nhập" });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: "Token hết hạn hoặc không hợp lệ" });
    req.user = decoded;
    next();
  });
};

exports.checkAuthUser = async (req, res) => {
  // Assuming you're using the cookie-based auth from previous examples
  // console.log('Cookies received:', req.cookies);
  // console.log('Cookies received:', req.cookies); // Kiểm tra cookie

  const token = req.cookies.access_token;
  
  // Debug
  // console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // console.log('Verifying token:', token);
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log('Decoded token:', decoded);
    // Fetch user data if needed
    res.json({
      user: {
        id: decoded.id,
        avatar: decoded.avatar,
        email: decoded.email,
        fullName: decoded.fullName,
        phone: decoded.phone,
      },
      accessToken:token
    });
  } catch (err) {
    // console.error('Token verification error:', err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
// Login admin
exports.loginUser = async (req, res) => {
  let pool;

  try {
    // Validate request body early
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: !email ? "Email is required" : "Password is required",
      });
    }

    // Log credentials for debugging (remove in production)
    // console.log("Login attempt:", { username });

    // Use existing pool instead of new connection
    // console.log('Extracted credentials:', { username, password })

    const pool = await getConnection();
    // console.log(pool)
    // console.log('DB connected');
    // Query user
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT * FROM Customers WHERE email = @email AND isEmailVerified = 1"
      );

    // Check if user exists
    if (!result.recordset?.length) {
      return res.status(401).json({ message: "Email or password Incorrect" });
    }

    const user = result.recordset[0];
    // console.log(user);

    // Verify password
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Email or password Incorrect" });
    }

    // Generate tokens
    const token = jwt.sign(
      {
        id: user.idCustomer,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // 🔒 Kiểm tra token có bị blacklist không
    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
      return res
        .status(403)
        .json({ error: "Token đã bị vô hiệu hóa, không thể đăng nhập" });
    }

    const refreshToken = jwt.sign(
      {
        id: user.idCustomer,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // console.log(token);
    // console.log(refreshToken);
    // console.log(user.idCustomer);
    // Update refresh token in DB
    const request = await pool
      .request()
      .input("id", sql.Int, user.idCustomer)
      .input("refreshToken", sql.NVarChar, refreshToken)
      .input(
        "refreshTokenExpiresAt",
        sql.DateTime,
        new Date(Date.now() + 604800000)
      ) // 7 days
      .query(
        "UPDATE Customers SET refreshToken = @refreshToken, refreshTokenExpiresAt = @refreshTokenExpiresAt WHERE idCustomer = @id"
      );
    // console.log(request);
    // Set cookies
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 1 day
      sameSite: "Strict", // Không gửi cookie khi truy cập từ domain hoặc cổng khác
      path: "/",
    });
    // console.log("NODE_ENV:", cookieres);
    // console.log(res.cookie);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000, // 7 days
      sameSite: "Strict", // Không gửi cookie khi truy cập từ domain hoặc cổng khác
      path: "/",
    });

    // res.json({ user: { id: decoded.id, role: decoded.role } });

    // Send response
    return res.json({
      message: "Login successful",
      user: {
        id: user.idCustomer,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        phone: user.phone,
      },
      accessToken: token, // Added access token
      refreshToken: refreshToken, // Added refresh token
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
  // No need for finally block with getPool; pool is managed externally
};


exports.googleLogin = async (req, res, next) => {
  // console.log(req);
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

exports.googleCallback = async (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    // console.log(user);
    if (err || !user) {
      // console.error("Google auth error:", err); // Debug lỗi
      // console.error("No user found after Google auth"); // Debug
      return res.redirect("http://localhost:5173/login?error=google_auth_failed");
    }

    try {
      const pool = await getConnection();
      const token = jwt.sign(
        {
          id: user.idCustomer,
          fullName: user.fullName,
          email: user.email,
          avatar: user.avatar,
          phone: user.phone,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      const refreshToken = jwt.sign(
        {
          id: user.idCustomer,
          email: user.email,
          avatar: user.avatar,
          phone: user.phone,
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      await pool
        .request()
        .input("id", sql.Int, user.idCustomer)
        .input("refreshToken", sql.NVarChar, refreshToken)
        .input(
          "refreshTokenExpiresAt",
          sql.DateTime,
          new Date(Date.now() + 604800000)
        )
        .query(
          "UPDATE Customers SET refreshToken = @refreshToken, refreshTokenExpiresAt = @refreshTokenExpiresAt WHERE idCustomer = @id"
        );

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
        sameSite: "Strict",
        path: "/",
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 604800000,
        sameSite: "Strict",
        path: "/",
      });

      // Chuyển hướng về frontend với token
      res.redirect("http://localhost:5173/login?success=google_auth_success");
    } catch (err) {
      console.error("Google callback error:", err);
      res.redirect("http://localhost:5173/login?error=server_error");
    }
  })(req, res, next);
};

exports.logout = async (req, res) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  //  console.log(accessToken);
  //  console.log(refreshToken);

  try {
    if (accessToken) {
      // console.log(accessToken);
      const decoded = jwt.decode(accessToken);
      const expiry = new Date(decoded.exp * 1000);
      await blacklistToken(accessToken, expiry);
    }

    if (refreshToken) {
      // console.log(refreshToken);
      const decoded = jwt.decode(refreshToken);
      const expiry = new Date(decoded.exp * 1000);
      await blacklistToken(refreshToken, expiry);
      await updateRefreshToken(req.user.idAdminUser, null, null);
      // console.log(updateToken);
    }

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to log out" });
  }
};

exports.protectedRoute = (req, res) => {
  res.json({
    status: "success",
    message: `Hello, ${req.user.username}! Role: ${req.user.role}`,
  });
};

exports.registerUser = async (req, res) => {
  try {
    const pool = await getConnection();
    const { fullName, password, email, phone } = req.body;

    // Kiểm tra email và phone đã tồn tại
    const checkResult = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone).query(`
        SELECT 
          (SELECT COUNT(*) FROM Customers WHERE email = @email) as emailCount,
          (SELECT COUNT(*) FROM Customers WHERE phone = @phone) as phoneCount
      `);

    const { emailCount, phoneCount } = checkResult.recordset[0];
    if (emailCount > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (phoneCount > 0) {
      return res.status(409).json({ message: "Phone already exists" });
    }

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    let avatar = "/user.jpg"; // Default avatar

    if (req.file) {
      const datetime = new Date()
        .toISOString()
        .replace(/[-:.T]/g, "")
        .slice(0, 14);
      const originalName = path.parse(req.file.originalname).name;
      const ext = path.extname(req.file.originalname);
      const newFilename = `newCustomer_${datetime}_${originalName}${ext}`;
      const newPath = path.join("public", newFilename);
      fs.renameSync(req.file.path, newPath);
      avatar = `/${newFilename}`;
    }

    // Tạo OTP và thời gian hết hạn (10 phút)
    const otpCode = generateOTP();
    const date = new Date();
    const offset = 7; // GMT+7
    const newDate = date.setHours(date.getHours() + offset);
    // console.log(Date(newDate));
    const otpExpiresAt = new Date(newDate + 2 * 60 * 1000); // Hết hạn sau 2 phút
    // console.log(otpExpiresAt);
    // Thêm user vào database với isEmailVerified = false
    const result = await pool
      .request()
      .input("fullName", sql.NVarChar, fullName)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone)
      .input("passwordHash", sql.NVarChar, passwordHash)
      .input("avatar", sql.NVarChar, avatar)
      .input("otpCode", sql.NVarChar, otpCode)
      .input("otpExpiresAt", sql.DateTime, otpExpiresAt)
      .input("isEmailVerified", sql.Bit, false) // Mặc định false
      .query(`
        INSERT INTO Customers (fullName, email, phone, passwordHash, avatar, createdAt, updatedAt, otpCode, otpExpiresAt, isEmailVerified)
        VALUES (@fullName, @email, @phone, @passwordHash, @avatar, GETDATE(), GETDATE(), @otpCode, @otpExpiresAt, @isEmailVerified);
        SELECT SCOPE_IDENTITY() as id;
      `);

    const idCustomer = result.recordset[0].id;

    // Gửi email chứa OTP
    await transporter.sendMail({
      from: "ngoctin10a11@gmail.com",
      to: email,
      subject: "Xác minh OTP đăng ký",
      text: `Mã OTP của bạn là: ${otpCode}. Mã này có hiệu lực trong 2 phút.`,
    });
    // console.log("Email sent successfully to:", email);

    res.status(201).json({
      success: true,
      data: { idCustomer, email },
      message: "OTP đã được gửi đến email của bạn",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const pool = await getConnection();
    const { email, otpCode } = req.body;
    // console.log(req.body);

    if (!email || !otpCode) {
      return res.status(400).json({ message: "Email và OTP là bắt buộc" });
    }

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("otpCode", sql.NVarChar, otpCode).query(`
        SELECT idCustomer, otpCode, otpExpiresAt 
        FROM Customers 
        WHERE email = @email
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const user = result.recordset[0];
    const currentTime = new Date();
    const offset = 7; // GMT+7
    const newCurrentTime = currentTime.setHours(
      currentTime.getHours() + offset
    );
    // console.log(Date(user.otpExpiresAt));
    // console.log(currentTime);

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ message: "OTP không đúng" });
    }

    if (new Date(user.otpExpiresAt) < newCurrentTime) {
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }

    // Cập nhật isEmailVerified thành true
    await pool.request().input("email", sql.NVarChar, email).query(`
        UPDATE Customers 
        SET isEmailVerified = 1, otpCode = NULL, otpExpiresAt = NULL 
        WHERE email = @email
      `);

    res.status(200).json({ success: true, message: "Xác minh OTP thành công" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: err.message });
  }
};
exports.resendOTP = async (req, res) => {
  try {
    const pool = await getConnection();
    const { email } = req.body;
    // console.log(email);
    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc" });
    }

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT idCustomer FROM Customers WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const otpCode = generateOTP();
    const date = new Date();
    const offset = 7; // GMT+7
    const newDate = date.setHours(date.getHours() + offset);
    // console.log(newDate);
    const otpExpiresAt = new Date(newDate + 2 * 60 * 1000); // Hết hạn sau 10 phút
    // console.log(otpExpiresAt);

    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("otpCode", sql.NVarChar, otpCode)
      .input("otpExpiresAt", sql.DateTime, otpExpiresAt).query(`
        UPDATE Customers 
        SET otpCode = @otpCode, otpExpiresAt = @otpExpiresAt 
        WHERE email = @email
      `);

    await transporter.sendMail({
      from: "ngoctin10a11@gmail.com",
      to: email,
      subject: "Gửi lại mã OTP đăng ký",
      text: `Mã OTP mới của bạn là: ${otpCode}. Mã này có hiệu lực trong 2 phút.`,
    });

    res.status(200).json({
      success: true,
      message: "OTP mới đã được gửi đến email của bạn",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error resending OTP", error: err.message });
  }
};

exports.getAllCustomerUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const order = await pool.request().query("SELECT * FROM Orders");

    // console.log(order.recordset);
    const groupedByCustomer = order.recordset.reduce((acc, order) => {
      const { idCustomer, totalAmount } = order;
      if (!acc[idCustomer]) {
        acc[idCustomer] = { total: 0, customerName: order.customerName };
      }
      acc[idCustomer].total += totalAmount;
      return acc;
    }, {});

    // Chuyển đổi dữ liệu nhóm thành mảng để dễ hiển thị
    const groupedArray = Object.keys(groupedByCustomer).map((idCustomer) => ({
      idCustomer,
      customerName: groupedByCustomer[idCustomer].customerName,
      totalAmount: groupedByCustomer[idCustomer].total,
    }));
// console.log(groupedArray);
    const result = await pool
      .request()
      .query(
        "SELECT idCustomer, avatar, email, fullName, phone, createdAt, isEmailVerified FROM Customers"
      );

    res.json({customer: result.recordset, groupedArray});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

exports.getCustomerUserID = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(
        "SELECT idCustomer, avatar, email, fullName, phone, isEmailVerified, createdAt FROM Customers WHERE idCustomer = @id"
      );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

exports.updateAdminUser = async (req, res) => {
  // Check authentication
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (
    req.user.role !== "Super-Admin" &&
    req.user.idAdminUser !== parseInt(req.params.id)
  ) {
    return res
      .status(403)
      .json({ message: "Unauthorized to update this user" });
  }

  // console.log("Route params:", req.params);
  // console.log("Request body:", req.body);
  // console.log("Request file:", req.file);

  try {
    const pool = await getConnection();
    const { username, fullName, email, role, phone, isActive, avatarPreview } =
      req.body;

    let query = "UPDATE AdminUsers SET";
    const request = pool.request().input("id", sql.Int, req.params.id);
    let hasFields = false;

    // Dynamically build query based on provided fields
    if (username !== undefined) {
      query += " username = @username,";
      request.input("username", sql.NVarChar, username);
      hasFields = true;
    }
    if (fullName !== undefined) {
      query += " fullName = @fullName,";
      request.input("fullName", sql.NVarChar, fullName);
      hasFields = true;
    }
    if (email !== undefined) {
      query += " email = @email,";
      request.input("email", sql.NVarChar, email);
      hasFields = true;
    }
    if (role !== undefined) {
      query += " role = @role,";
      request.input("role", sql.NVarChar, role);
      hasFields = true;
    }
    if (phone !== undefined) {
      query += " phone = @phone,";
      request.input("phone", sql.NVarChar, phone || null);
      hasFields = true;
    }
    if (isActive !== undefined) {
      const isActiveBool = isActive === "true" || isActive === true;
      query += " isActive = @isActive,";
      request.input("isActive", sql.Bit, isActiveBool);
      hasFields = true;
    }

    // Handle file upload only if present
    // let Avatar;
    if (req.file) {
      const id = req.params.id;
      const datetime = new Date()
        .toISOString()
        .replace(/[-:.T]/g, "")
        .slice(0, 14);
      const originalName = path.parse(req.file.originalname).name;
      const ext = path.extname(req.file.originalname);
      const newFilename = `updateAdmin_${id}_${datetime}_${originalName}${ext}`;
      const newPath = path.join("public", newFilename);
      fs.renameSync(req.file.path, newPath);
      Avatar = `/${newFilename}`;
      query += " Avatar = @Avatar,";
      request.input("Avatar", sql.NVarChar, Avatar);
      hasFields = true;
    } else if (avatarPreview === "null") {
      // Khi avatarPreview là "null", đặt Avatar thành /user.jpg
      query += " Avatar = @Avatar,";
      request.input("Avatar", sql.NVarChar, "/user.jpg");
      hasFields = true;
    }

    if (!hasFields) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // Remove trailing comma and add WHERE clause
    query = query.slice(0, -1) + " WHERE idAdminUser = @id";
    // console.log("Executing query:", query);

    const result = await request.query(query);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Update Admin User Error:", err); // Log to server console
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};
exports.deleteAdminUser = async (req, res) => {
  if (req.user.role !== "Super-Admin") {
    return res
      .status(403)
      .json({ message: "Only Super-Admins can delete users" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM AdminUsers WHERE idAdminUser = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

// Backend (Node.js/Express with SQL Server)
exports.searchAdminUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const { search = "", page = 1, limit = 10 } = req.query;

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Search query with pagination
    const query = `
      SELECT idAdminUser, username, email, fullName, phone, role, createdAt, isActive 
      FROM AdminUsers 
      WHERE username LIKE @search
      OR email LIKE @search
      OR fullName LIKE @search
      OR phone LIKE @search
      ORDER BY createdAt DESC
      OFFSET @offset ROWS 
      FETCH NEXT @limit ROWS ONLY;
      
      SELECT COUNT(*) as total 
      FROM AdminUsers 
      WHERE username LIKE @search
      OR email LIKE @search
      OR fullName LIKE @search
      OR phone LIKE @search;
    `;

    const result = await pool
      .request()
      .input("search", sql.NVarChar, `%${search}%`)
      .input("offset", sql.Int, offset)
      .input("limit", sql.Int, limit)
      .query(query);

    res.json({
      data: result.recordsets[0],
      total: result.recordsets[1][0].total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error searching users",
      error: err.message,
    });
  }
};
