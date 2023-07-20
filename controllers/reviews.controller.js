const ReviewService = require('../services/reviews.services');

class ReviewsController {
  reviewService = new ReviewService();
  // 리뷰 작성 API
  createReview = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { petSitterId } = req.params;
      const { content, rating } = req.body;

      if (!content || !rating) {
        return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      await this.reviewService.createReview(userId, petSitterId, content, rating);
      return res.status(201).json({ message: '리뷰를 작성하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  // 펫시터id로 리뷰 조회 API
  getReview = async (req, res) => {
    try {
      const { petSitterId } = req.params;

      const reviews = await this.reviewService.getReview(petSitterId);

      return res.status(200).json({ reviews });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //리뷰 수정 API
  updateReview = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { reviewId } = req.params;
      const { content, rating } = req.body;

      await this.reviewService.updateReview(userId, reviewId, content, rating);
      return res.status(200).json({ message: '리뷰를 수정하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //리뷰 삭제 API
  deleteReview = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { reviewId } = req.params;

      await this.reviewService.deleteReview(userId, reviewId);
      return res.status(200).json({ message: '리뷰를 삭제하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = ReviewsController;
