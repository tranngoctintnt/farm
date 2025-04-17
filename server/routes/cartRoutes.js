const express = require('express');
const { addToCart, getCart, updateCartItem, removeCartItem } = require('../controllers/cartController');
const {authenticateTokenUser} = require('../middleware/user');

const router = express.Router();

// console.log('cartRoutes.js loaded', addToCart, getCart, updateCartItem, removeCartItem);
// Định nghĩa các route cho giỏ hàng
// router.post('/add', authenticateTokenUser, addToCart);
// router.get('/', authenticateTokenUser, getCart);

router.post('/add', authenticateTokenUser, addToCart);
router.get('/', authenticateTokenUser, getCart);
router.put('/update', authenticateTokenUser, updateCartItem);
router.delete('/remove', authenticateTokenUser, removeCartItem);

module.exports = router;