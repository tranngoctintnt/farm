const express = require('express');
const { checkout, getOrders, cancelOrder, updateOrderStatus, getOrderForAdmin, getOrdersById,getOrdersOfCustomerForAdmin } = require('../controllers/orderController');
const {authenticateTokenUser} = require('../middleware/user');
const { authenticateToken } = require('../middleware/admin'); // Assuming you have this middleware for admin authentication

const router = express.Router();

router.post('/checkout', authenticateTokenUser, checkout);
router.get('/', authenticateTokenUser, getOrders);
router.get('/orderOfCustomer/:id', authenticateToken, getOrdersOfCustomerForAdmin);

router.get('/order-admin',authenticateToken, getOrderForAdmin); // Assuming this is for admin orders as well
router.get('/orderdetail/:id',authenticateToken,getOrdersById); // Assuming this is for admin orders as well

router.put('/cancel', authenticateTokenUser, cancelOrder);
router.put('/update-status',authenticateToken, updateOrderStatus);
module.exports = router;