const ReviewService = require('../services/reviews.service');

class ReviewsController {
  reviewService = new ReviewService();

  // # 리뷰 조회 API
  getReviews = async (req, res, next) => {
    try {
      const reviews = await this.reviewService.getReviews();
      return res.status(200).json({ review: reviews });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: '리뷰 조회에 실패하였습니다.' });
    }
  };
  // # 리뷰 등록 API
  createReview = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { petSitterId } = req.params;
      const { content, rating } = req.body;
      if (!content || !rating) {
        return res.status(412).json({ message: '입력되지 않은 정보가 있습니다.' });
      }
      await this.reviewService.createReview(userId, petSitterId, content, rating);
      return res.status(201).json({ message: '리뷰가 성공적으로 등록되었습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: '리뷰가 정상적으로 등록되지 않았습니다.' });
    }
  };

  // # 리뷰 수정 API
  updateReview = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { reviewId } = req.params;
      const { content, rating } = req.body;
      await this.reviewService.updateReview(userId, reviewId, content, rating);
      return res.status(201).json({ message: '리뷰가 수정되었습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errorMessage: '리뷰 수정에 실패하였습니다.' });
    }
  };

  // # 리뷰 삭제 API
  
}

module.exports = ReviewsController;
