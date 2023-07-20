const BookingRepository = require('../repositories/bookings.repository');
class BookingService {
  bookingRepository = new BookingRepository();
  getBooking = async () => {
    const getBooking = await this.bookingRepository.getBooking();
    return getBooking;
  };
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    const isExistPetSitter = await this.bookingRepository.findPetSitterId();
    if (!isExistPetSitter) {
      throw new Error('현재 예약 가능한 펫시터가 없습니다.');
    }
    return await this.bookingRepository.createBooking(userId, petSitterId, startTime, endTime);
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingService;
