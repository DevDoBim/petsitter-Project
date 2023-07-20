const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const ReviewsController = require('../controllers/reviews.controller');
const reviewsController = new ReviewsController();

router.post('/:petSitterId', authMiddleware, reviewsController.createReview);
router.get('/:petSitterId', reviewsController.getReview);
router.put('/:reviewId', authMiddleware, reviewsController.updateReview);
router.delete('/:reviewId', authMiddleware, reviewsController.deleteReview);

module.exports = router;
