const { Bookings } = require('../models');

class BookingRepository {
  getBooking = async () => {
    await Bookings.findAll({});
  };
  createBooking = async (userId, petSitterId, startDay, endDay) => {
    return await Bookings.create(userId, petSitterId, startDay, endDay);
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingRepository;
