require("dotenv").config(); // Tải các biến môi trường từ file .env
const sql = require("mssql");
const express = require("express");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  connectionTimeout: 15000, // Thời gian chờ kết nối
  requestTimeout: 30000, // Thời gian chờ khi thực hiện truy vấn
  pool: {
    min: 1,
    max: 10,
    idleTimeoutMillis: 30000 // Thời gian chờ trước khi một kết nối bị đóng
  }
};

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

// // Updated to fetch by username instead of email
// async function getUserByUsername(username) {
//   const pool = await connectToDb();
//   const result = await pool.request()
//       .input('username', sql.NVarChar, username)
//       .query('SELECT * FROM Users WHERE username = @username');
//   return result.recordset[0];
// }

async function updateRefreshToken(userId, refreshToken, expiresAt) {
  const pool = await sql.connect(dbConfig);
  // console.log(userId, refreshToken, expiresAt);
  await pool
    .request()
    .input("id", sql.Int, userId)
    .input("refreshToken", sql.NVarChar, refreshToken)
    .input("refreshTokenExpiresAt", sql.DateTime, expiresAt) // 7 days
    .query(
      "UPDATE AdminUsers SET refreshToken = @refreshToken, refreshTokenExpiresAt = @refreshTokenExpiresAt WHERE idAdminUser = @id"
    );
}

async function isTokenBlacklisted(token) {
  const pool = await sql.connect(dbConfig);

  // console.log(pool);
  const result = await pool
    .request()
    .input("token", sql.NVarChar, token)
    .query("SELECT * FROM BlacklistedTokens WHERE token = @token");
  return result.recordset.length > 0;
}

async function blacklistToken(token, expiry) {
  const pool = await sql.connect(dbConfig);
  await pool
    .request()
    .input("token", sql.NVarChar, token)
    .input("expiry", sql.DateTime, expiry)
    .query(
      "INSERT INTO BlacklistedTokens (token, expiry) VALUES (@token, @expiry)"
    );
}

// Tạo pool kết nối và xử lý lỗi nếu kết nối thất bại
// sql
//   .connect(dbConfig)
//   .then((pool) => {
//     console.log("Connected to SQL Server"); // Thông báo khi kết nối thành công
//     return pool;
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err); // Ghi lỗi nếu kết nối thất bại
//     process.exit(1); // Thoát ứng dụng nếu không thể kết nối
//   });
// Tạo pool toàn cục
let poolPromise = sql.connect(dbConfig)
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });


module.exports = {
  sql,
  dbConfig,
  JWT_SECRET,
  getConnection: () => poolPromise,
  updateRefreshToken,
  isTokenBlacklisted,
  blacklistToken,
};
