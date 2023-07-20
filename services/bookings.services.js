const BookingRepository = require('../repositories/bookings.repository');
const ApiError = require('../apierror');

class BookingService {
  bookingRepository = new BookingRepository();
  //유저 예약 조회 API
  getBooking = async (userId) => {
    return await this.bookingRepository.getBooking(userId);
  };
  // 예약 생성 API
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    const isExistSitter = await this.bookingRepository.findSitter(petSitterId);
    if (!isExistSitter) {
      throw new ApiError('펫시터가 존재하지 않습니다.', 404);
    }
    return await this.bookingRepository.createBooking(userId, petSitterId, startTime, endTime);
  };
  //예약 수정 API
  updateBooking = async (userId, bookingId, startTime, endTime) => {
    const updatedBooking = await this.bookingRepository.getBookingById(bookingId);
    if (!updatedBooking) {
      throw new ApiError('예약이 존재하지 않습니다.', 404);
    }
    if (userId !== updatedBooking.userId) {
      throw new ApiError('예약 수정 권한이 없습니다.', 403);
    }
    return await this.bookingRepository.updateBooking(bookingId, startTime, endTime);
  };
  //예약 취소 API
  deleteBooking = async (userId, bookingId) => {
    const deletedBooking = await this.bookingRepository.getBookingById(bookingId);
    if (!deletedBooking) {
      throw new ApiError('예약이 존재하지 않습니다.', 404);
    }
    if (userId !== deletedBooking.userId) {
      throw new ApiError('예약 수정 권한이 없습니다.', 403);
    }
    await this.bookingRepository.deleteBooking(bookingId);
  };
}
module.exports = BookingService;
