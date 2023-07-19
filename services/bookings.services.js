const BookingRepository = require('../repositories/bookings.repository');
class BookingService {
  bookingRepository = new BookingRepository();
  getBooking = async () => {
    const getBooking = await this.bookingRepository.getBooking();
    return getBooking;
  };
  createBooking = async (startDay, endDay) => {
    const createBooking = await this.bookingRepository.createBooking(startDay, endDay);
    console.log('ser', createBooking);
    return createBooking;
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingService;
