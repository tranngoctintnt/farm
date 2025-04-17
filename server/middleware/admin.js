const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { dbConfig, JWT_SECRET, isTokenBlacklisted } = require('../config/db');

const authenticateToken = async (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    // console.log(req.path.startsWith('/admin'));
    // let token;
    const token = req.cookies.admin_access_token;
    
console.log('Token:', token);
    if (!token) {
        // console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }

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
            .query('SELECT * FROM AdminUsers WHERE idAdminUser = @id AND isActive = 1');
        
        if (result.recordset.length === 0) {
            return res.status(403).json({ message: 'Invalid or inactive user' });
        }
        req.user = result.recordset[0];
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticateToken };