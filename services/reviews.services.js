const ReviewRepository = require('../repositories/reviews.repository');
const ApiError = require('../apierror');

class ReviewService {
  reviewRepository = new ReviewRepository();
  // 리뷰 작성 API
  createReview = async (userId, petSitterId, content, rating) => {
    const isExistSitter = await this.reviewRepository.findSitter(petSitterId);
    if (!isExistSitter) {
      throw new ApiError('펫시터가 존재하지 않습니다.', 404);
    }
    await this.reviewRepository.createReview(userId, petSitterId, content, rating);
  };
  // 리뷰 조회 API
  getReview = async (petSitterId) => {
    const isExistSitter = await this.reviewRepository.findSitter(petSitterId);
    if (!isExistSitter) {
      throw new ApiError('펫시터가 존재하지 않습니다.', 404);
    }
    return await this.reviewRepository.getReview(petSitterId);
  };
  //리뷰 수정 API
  updateReview = async (userId, reviewId, content, rating) => {
    const updatedReview = await this.reviewRepository.getReviewById(reviewId);
    if (!updatedReview) {
      throw new ApiError('리뷰가 존재하지 않습니다.', 404);
    }
    if (userId !== updatedReview.userId) {
      throw new ApiError('리뷰 수정 권한이 없습니다.', 403);
    }

    await this.reviewRepository.updateReview(reviewId, content, rating);
  };
  //리뷰 삭제 API
  deleteReview = async (userId, reviewId) => {
    const deletedReview = await this.reviewRepository.getReviewById(reviewId);
    if (!deletedReview) {
      throw new ApiError('리뷰가 존재하지 않습니다.', 404);
    }
    if (userId !== deletedReview.userId) {
      throw new ApiError('리뷰 삭제 권한이 없습니다.', 403);
    }

    await this.reviewRepository.deleteReview(reviewId);
  };
}

module.exports = ReviewService;
