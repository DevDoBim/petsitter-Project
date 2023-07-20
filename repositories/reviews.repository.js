const { Reviews} = require('../models');

class ReviewRepository {
  // # 리뷰 조회 API
  getReviews = async () => {
    const reviews = await Reviews.findAll();
    return reviews;
  };

  // # 리뷰 작성 API
  createReview = async (userId, petSitterId, content, rating) => {
    const createReviewData = await Reviews.create({ userId, petSitterId, content, rating });
    return createReviewData;
  };

  // # 리뷰 수정 API
  updateReview = async (userId, reviewId, content, rating) => {
    const updateReviewData = {};
    if (content) updateReviewData.content = content;
    if (rating) updateReviewData.rating = rating;

    await Reviews.update(updateReviewData, { where: { userId, reviewId } });
    return;
  };
}

module.exports = ReviewRepository;
