const BookingRepository = require('../repositories/bookings.repository');
class BookingService {
  bookingRepository = new BookingRepository();
  getBooking = async () => {
    const getBooking = await this.bookingRepository.getBooking();
    return getBooking;
  };
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    const createBooking = await this.bookingRepository.createBooking(
      userId,
      petSitterId,
      startTime,
      endTime
    );
    return createBooking;
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingService;
