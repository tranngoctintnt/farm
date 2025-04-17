const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const adminUsersRoutes = require('./routes/admin');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/productRoute');
const customersRoutes = require('./routes/user');
const cartRoutes = require('./routes/cartRoutes'); // Route cho giỏ hàng
const orderRoutes = require('./routes/orderRoutes'); // Route cho đơn hàng
const addressRoutes = require('./routes/addressRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // Route cho đánh giá
// const logger = require('./config/logger');
// const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');

app.use(cookieParser());
app.use(express.json());

const originTrust = [
    'http://localhost:5173', 'http://localhost:5174', 'https://adminstf.suoitien.vn', 'https://stf.suoitien.vn',
    
]

app.use(cors({ origin: originTrust, credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
 }));
// app.use(rateLimitMiddleware); // Áp dụng rate limiting cho tất cả các route

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from 'public' folder

// Middleware


// Log incoming requests
app.use((req, res, next) => {
    // console.log(`[${req.method}] ${req.path}`);
    // console.log('Headers:', req.headers);
    // console.log('Body:', req.body); // This will be undefined before express.json()
    next();
});

app.use((req, res, next) => {
    // console.log('Parsed Body:', req.body);
    next();
});


// Ghi log cho mỗi request
// app.use((req, res, next) => {
//   logger.info(`Incoming request: ${req.method} ${req.url}`, {
//     body: req.body,
//     headers: req.headers
//   });
//   next();
// });

// console.log(cateRoutes);

app.use('/api', adminUsersRoutes);
// app.use('/api', cateRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', customersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/reviews', reviewRoutes);
// Xử lý lỗi 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});