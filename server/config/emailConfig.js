const nodemailer = require('nodemailer');

// Cấu hình transporter với Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ngoctin10a11@gmail.com", // Thay bằng email của bạn
      pass: "csjc srtv pvuf gtgg",
      // Thay bằng mật khẩu ứng dụng (App Password nếu dùng Gmail)
    },
});

module.exports = transporter;