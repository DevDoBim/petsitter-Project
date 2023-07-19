const { Bookings } = require('../models');

class BookingRepository {
  getBooking = async () => {
    await Bookings.findAll({});
  };
  createBooking = async (startDay, endDay) => {
    const createBooking = await Bookings.create(startDay, endDay);
    console.log('rep', createBooking);
    return createBooking;
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingRepository;
