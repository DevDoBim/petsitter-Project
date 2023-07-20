const { Bookings, Petsitters } = require('../models');
const { Op } = require('sequelize');

class BookingRepository {
  //유저 예약 조회 API
  getBooking = async (userId) => {
    return await Bookings.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  };
  //펫시터id로 조회
  findSitter = async (petSitterId) => {
    return await Petsitters.findByPk(petSitterId);
  };
  //생성 시 예약 시간 중복 조회
  findExistBooking = async (petSitterId, startTime, endTime) => {
    return await Bookings.findOne({
      where: {
        petSitterId,
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
      },
    });
  };
  // 예약 생성 API
  createBooking = async (userId, petSitterId, startTime, endTime) => {
    return await Bookings.create({ userId, petSitterId, startTime, endTime });
  };
  //예약 id로 조회
  getBookingById = async (bookingId) => {
    return await Bookings.findByPk(bookingId);
  };
  //수정 시 예약 시간 중복 조회
  findExist = async (petSitterId, bookingId, startTime, endTime) => {
    return await Bookings.findOne({
      where: {
        petSitterId,
        bookingId: { [Op.not]: bookingId },
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
      },
    });
  };
  //예약 수정 API
  updateBooking = async (bookingId, startTime, endTime) => {
    await Bookings.update({ startTime, endTime }, { where: { bookingId } });
    return await Bookings.findByPk(bookingId);
  };
  //예약 취소 API
  deleteBooking = async (bookingId) => {
    await Bookings.destroy({ where: { bookingId } });
  };
}
module.exports = BookingRepository;
