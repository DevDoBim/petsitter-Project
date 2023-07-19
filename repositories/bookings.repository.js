const { Bookings } = require('../models');

class BookingRepository {
  getBooking = async () => {
    await Bookings.findAll({});
  };
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    return await Bookings.create(userId, petSitterId, startTime, endTime);
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingRepository;
