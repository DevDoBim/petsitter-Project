const { Reviews, Petsitters } = require('../models');

class ReviewRepository {
  //펫시터id로 조회
  findSitter = async (petSitterId) => {
    return await Petsitters.findByPk(petSitterId);
  };
  // 리뷰 작성 API
  createReview = async (userId, petSitterId, content, rating) => {
    await Reviews.create({ userId, petSitterId, content, rating });
  };
  // 리뷰 조회 API
  getReview = async (petSitterId) => {
    return await Reviews.findAll({ where: { petSitterId }, order: [['createdAt', 'DESC']] });
  };
  //리뷰id로 조회
  getReviewById = async (reviewId) => {
    return await Reviews.findByPk(reviewId);
  };
  //리뷰 수정 API
  updateReview = async (reviewId, content, rating) => {
    const updateValues = {};
    if (content) updateValues.content = content;
    if (rating) updateValues.rating = rating;
    await Reviews.update(updateValues, { where: { reviewId } });
  };
  //리뷰 삭제 API
  deleteReview = async (reviewId) => {
    await Reviews.destroy({ where: { reviewId } });
  };
}

module.exports = ReviewRepository;
