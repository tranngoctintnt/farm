const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { dbConfig, JWT_SECRET, isTokenBlacklisted } = require('../config/db');

const authenticateTokenUser = async (req, res, next) => {
    // console.log('Headers:', req.headers);
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header Authorization (dạng "Bearer <token>")
    // console.log('authHeader',req.cookies);
    // console.log('req cookie',req);
    const token = req.cookies.access_token;
 
    // console.log("token", token);
    // console.log("token1", token1);


    // if (!token) {
    //     const authHeader = req.headers['authorization'];
    //     token = authHeader && authHeader.split(' ')[1]; // Lấy token từ header Authorization (dạng "Bearer <token>")
    // }
    if (!token) {
        // console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }
    // const blacklisted = await isTokenBlacklisted(token);
    // if (blacklisted) return res.status(403).json({ error: 'Token đã bị vô hiệu hóa' });
    try {
        const isBlacklisted = await isTokenBlacklisted(token);
        // console.log('Token blacklisted?', isBlacklisted);

        if (isBlacklisted) {
            // console.log('Token is blacklisted');
            return res.status(401).json({ status: 'error', message: 'Token is invalid or logged out' });
        }

        // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //     if (err) {
        //         console.log('JWT verification error:', err.message);
        //         return res.status(403).json({ status: 'error', message: 'Invalid token' });
        //     }
        //     console.log('Decoded user:', user);
        //     req.user = user;
        //     next();
        // });
        const decoded = jwt.verify(token, JWT_SECRET);
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, decoded.id)
            .query('SELECT * FROM Customers WHERE idCustomer = @id AND isEmailVerified = 1');
        
        if (result.recordset.length === 0) {
            return res.status(403).json({ message: 'Invalid or inactive user' });
        }
        req.user = result.recordset[0]; // Gắn vào request để sử dụng trong các controller
        next(); // Chuyển sang middleware hoặc controller tiếp theo
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports =  {authenticateTokenUser} ; // Xuất middleware để sử dụng trong các route