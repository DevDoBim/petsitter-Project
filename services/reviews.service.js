const ReviewRepository = require('../repositories/reviews.repository');
const ApiError = require('../apierror');

class ReviewService {
  reviewRepository = new ReviewRepository();

  // # 리뷰 조회 API
  getReviews = async () => {
    const allReview = await this.reviewRepository.getReviews();

    if (!allReview) {
      throw new ApiError('등록된 리뷰가 없습니다.', 412);
    }
    // 호출한 Review들을 가장 최신 리뷰부터 정렬합니다.
    allReview.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allReview.map((review) => {
      return {
        reviewId: review.postId,
        content: review.content,
        rating: review.rating,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      };
    });
  };
  // # 리뷰 작성 API
  createReview = async (userId, petSitterId, content, rating) => {
    const contentLength = /^.{10,}$/;
    if (!contentLength.test(content)) {
      throw new ApiError('10글자 이상 입력하세요.', 412);
    }
    await this.reviewRepository.createReview(userId, petSitterId, content, rating);

    return;
  };

  // # 리뷰 수정 API
  updateReview = async (userId, reviewId, content, rating) => {
    if (!content && !rating) {
      throw new ApiError('수정 내역이 없습니다.', 412);
    }
    await this.reviewRepository.updateReview(userId, reviewId, content, rating);
  };
}

module.exports = ReviewService;
