const BookingRepository = require('../repositories/bookings.repository');
class BookingService {
  bookingRepository = new BookingRepository();
  getBooking = async () => {
    const getBooking = await this.bookingRepository.getBooking();
    return getBooking;
  };
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    const isExistBooking = await this.bookingRepository.findBooking();
    if (!isExistBooking) {
      throw new Error('현재 예약 가능한 펫시터가 없습니다.');
    }
    return await this.bookingRepository.createBooking(userId, petSitterId, startTime, endTime);
  };
  updateBooking = async (bookingId, startTime, endTime) => {
    return await this.bookingRepository.updateBooking(bookingId, startTime, endTime);
  };
  deleteBooking = async (bookingId) => {
    return await this.bookingRepository.deleteBooking(bookingId);
  };
}
module.exports = BookingService;
