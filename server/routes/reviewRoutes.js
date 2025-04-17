const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {authenticateTokenUser} = require('../middleware/user');
const { authenticateToken } = require('../middleware/admin');

router.get('/', reviewController.getAllReviews);
router.get('/reviews-all',authenticateToken, reviewController.getAllReviewsForAdmin);
router.put('/update-status/:id', reviewController.editStatusReviewById);

router.get('/:id', reviewController.getReviewById);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;