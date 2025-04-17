const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Ghi tất cả log vào file combined.log
    new winston.transports.File({ filename: 'logs/combined.log' }),
    // Ghi lỗi vào file error.log
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Hiển thị log trên console trong môi trường development
    new winston.transports.Console()
  ]
});

module.exports = logger;