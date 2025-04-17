const express = require("express");
const cookieParser = require("cookie-parser");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(cookieParser());
app.use(express.json());
const { dbConfig, JWT_SECRET, updateRefreshToken, isTokenBlacklisted, blacklistToken } = require("../config/db");

exports.checkAuth = async(req, res) => {
    // Assuming you're using the cookie-based auth from previous examples
    // console.log('Cookies received:', req.cookies);
    const token = req.cookies.admin_access_token;
       // Debug
    // console.log('Received token:', token); 
 
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  
    try {
        // console.log('Verifying token:', token);
      const decoded = jwt.verify(token, JWT_SECRET);
      // console.log('Decoded token:', decoded);
      // Fetch user data if needed
      res.json({ user: { id: decoded.id, role: decoded.role } });
    } catch (err) {
        // console.error('Token verification error:', err.message);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
// Login admin
exports.loginAdmin = async (req, res) => {
  let pool;

  try {
    // Validate request body early
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        message: !username ? "Username is required" : "Password is required",
      });
    }

    // Log credentials for debugging (remove in production)
    // console.log("Login attempt:", { username });

    // Use existing pool instead of new connection
    // console.log('Extracted credentials:', { username, password })

    const pool = await sql.connect(dbConfig);
    // console.log(pool)
    // console.log('DB connected');
    // Query user
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query(
        "SELECT * FROM AdminUsers WHERE username = @username AND isActive = 1"
      );

    // Check if user exists
    if (!result.recordset?.length) {
      return res.status(401).json({ message: "Username or password Incorrect" });
    }

    const user = result.recordset[0];

    // Verify password
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Username or password Incorrect" });
    }

    // Generate tokens
    const token = jwt.sign(
      { id: user.idAdminUser, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );


    const refreshToken = jwt.sign({ id: user.idAdminUser }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Update refresh token in DB
    await pool
      .request()
      .input("id", sql.Int, user.idAdminUser)
      .input("refreshToken", sql.NVarChar, refreshToken)
      .input(
        "refreshTokenExpiresAt",
        sql.DateTime,
        new Date(Date.now() + 604800000)
      ) // 7 days
      .query(
        "UPDATE AdminUsers SET refreshToken = @refreshToken, refreshTokenExpiresAt = @refreshTokenExpiresAt WHERE idAdminUser = @id"
      );

    // Set cookies
    res.cookie("admin_access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 1 days
      sameSite: "Strict",
      path: "/", 
    });

    res.cookie("admin_refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000, // 7 days
      sameSite: "Strict",
      path: "/", 
    });

    // res.json({ user: { id: decoded.id, role: decoded.role } });

    // Send response
    return res.json({
      message: "Login successful",
      user: { id: user.idAdminUser, role: user.role},
      accessToken: token,         // Added access token
      refreshToken: refreshToken  // Added refresh token
      
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

 
exports.logout = async (req, res) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    // console.log(req.user.idAdminUser);

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

        res.clearCookie('admin_access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.clearCookie('admin_refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Failed to log out' });
    }
};

exports.protectedRoute = (req, res) => {
    res.json({ status: 'success', message: `Hello, ${req.user.username}! Role: ${req.user.role}` });
};

exports.createAdminUser = async (req, res) => {
  if (req.user.role !== "Super-Admin") {
    return res
      .status(403)
      .json({ message: "Only Super-Admins can create users" });
  }
  // console.log("Request body:", req.body);
  // console.log("Request file:", req.file);
 

  try {
  
    const pool = await sql.connect(dbConfig);
    const { username, password, email, fullName, phone, role, isActive } = req.body;
    const checkResult = await pool
      .request()  
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("phone", sql.NVarChar, phone)
      .query(`
        SELECT 
          (SELECT COUNT(*) FROM AdminUsers WHERE username = @username) as usernameCount,
          (SELECT COUNT(*) FROM AdminUsers WHERE email = @email) as emailCount,
          (SELECT COUNT(*) FROM AdminUsers WHERE phone = @phone) as phoneCount
      `);

    const { usernameCount, emailCount, phoneCount } = checkResult.recordset[0];

    // Kiểm tra kết quả
    if (usernameCount > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }
    if (emailCount > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (phoneCount > 0) {
      return res.status(409).json({ message: "Phone already exists" });
    }

    if (!username, !fullName || !email || !role || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let Avatar = "/user.jpg"; // Default

    if (req.file) {
      const datetime = new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
      const originalName = path.parse(req.file.originalname).name;
      const ext = path.extname(req.file.originalname);
      const newFilename = `newAdmin_${datetime}_${originalName}${ext}`;
      const newPath = path.join("public", newFilename);
      fs.renameSync(req.file.path, newPath);
      Avatar = `/${newFilename}`;
    }

    const query = `
      INSERT INTO AdminUsers (username, fullName, email, role, phone, isActive, passwordHash, Avatar)
      VALUES (@username, @fullName, @email, @role, @phone, @isActive, @passwordHash, @Avatar);
      SELECT SCOPE_IDENTITY() as id;
    `;
    const request = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("fullName", sql.NVarChar, fullName)
      .input("email", sql.NVarChar, email)
      .input("role", sql.NVarChar, role || "Admin")
      .input("phone", sql.NVarChar, phone)
      .input("isActive", sql.Bit, isActive === "true" || isActive === true)
      .input("passwordHash", sql.NVarChar, passwordHash)
      .input("Avatar", sql.NVarChar, Avatar);

      // console.log("Executing query:", query);

    const result = await request.query(query);
    // console.log("Insert result:", result);
    res
      .status(201)
      .json({
        id: result.recordset[0].idAdminUser,
        message: "User created successfully",
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

exports.getAllAdminUsers = async (req, res) => {
  if (req.user.role !== "Super-Admin") {
    return res
      .status(403)
      .json({ message: "Only Super-Admins can get users" });
  }
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query(
        "SELECT idAdminUser, username, email, fullName, phone, role, createdAt, isActive FROM AdminUsers"
      );

    res.json(result.recordset);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

exports.getAdminUserID = async (req, res) => {
  if (req.user.role !== "Super-Admin") {
    return res
      .status(403)
      .json({ message: "Only Super-Admins can get users" });
  }
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(
        "SELECT idAdminUser, username,passwordHash, email, fullName, phone, role, createdAt, isActive,Avatar FROM AdminUsers WHERE idAdminUser = @id"
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
    const pool = await sql.connect(dbConfig);
    const {username, fullName, email, role, phone, isActive,avatarPreview } = req.body;

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
      const datetime = new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
      const originalName = path.parse(req.file.originalname).name;
      const ext = path.extname(req.file.originalname);
      const newFilename = `updateAdmin_${id}_${datetime}_${originalName}${ext}`;
      const newPath = path.join("public", newFilename);
      fs.renameSync(req.file.path, newPath);
      Avatar = `/${newFilename}`;
      query += " Avatar = @Avatar,";
      request.input("Avatar", sql.NVarChar, Avatar);
      hasFields = true;
    }
    else if (avatarPreview === "null") {
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
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};
exports.deleteAdminUser = async (req, res) => {
  if (req.user.role !== "Super-Admin") {
    return res
      .status(403)
      .json({ message: "Only Super-Admins can delete users" });
  }

  try {
    const pool = await sql.connect(dbConfig);
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
    const pool = await sql.connect(dbConfig);
    const { search = '', page = 1, limit = 10 } = req.query;
    
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

    const result = await pool.request()
      .input('search', sql.NVarChar, `%${search}%`)
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(query);

    res.json({
      data: result.recordsets[0],
      total: result.recordsets[1][0].total,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error searching users", 
      error: err.message 
    });
  }
};