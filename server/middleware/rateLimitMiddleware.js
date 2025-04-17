const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

// Cấu hình rate limit: 100 requests mỗi 15 phút cho mỗi IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Cửa sổ thời gian: 15 phút (tính bằng milliseconds)
  max: 100, // Giới hạn 100 requests trong cửa sổ thời gian
  message: 'Too many requests from this IP, please try again after 15 minutes', // Thông báo khi vượt giới hạn
  standardHeaders: true, // Trả về header RateLimit
  legacyHeaders: false, // Không sử dụng header X-RateLimit
  handler: (req, res) => {
    // Ghi log khi IP vượt giới hạn
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      message: 'Too many requests from this IP, please try again after 15 minutes'
    });
  }
});

module.exports = limiter;