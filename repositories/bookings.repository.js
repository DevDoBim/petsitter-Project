const { Model } = require('sequelize');
const { Bookings, Petsitters } = require('../models');

class BookingRepository {
  getBooking = async () => {
    await Bookings.findAll({});
  };

  findPetSitterId = async (petSitterId) => {
    return await Petsitters.findOne({ petSitterId });
  };
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    return await Bookings.create(userId, petSitterId, startTime, endTime);
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingRepository;
