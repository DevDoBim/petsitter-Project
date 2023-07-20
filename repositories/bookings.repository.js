const { Bookings, Petsitters } = require('../models');

class BookingRepository {
  getBooking = async () => {
    await Bookings.findAll({});
  };

  findBooking = async (petSitterId, userId) => {
    return await Bookings.findOne({ where: { petSitterId, userId } });
  };
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    return await Bookings.create({ userId, petSitterId, startTime, endTime });
  };
  updateBooking = async (bookingId, startTime, endTime) => {
    const booking = await Bookings.findByPk(bookingId);
    return await booking.update({ startTime, endTime }, { where: { bookingId } });
  };
  deleteBooking = async (bookingId) => {
    return await Bookings.destroy({ where: { bookingId } });
  };
}
module.exports = BookingRepository;
