const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const ReviewsController = require('../controllers/reviews.controller');
const reviewsController = new ReviewsController(); // 모듈에 대한 클래스 선언

// API 동작, router와 controller 연결
router.get('/review', authMiddleware, reviewsController.getReviews);
router.post('/review/:petSitterId', authMiddleware, reviewsController.createReview);
router.put('/review/:reviewId',authMiddleware, reviewsController.updateReview);
// router.delete();

module.exports = router;
