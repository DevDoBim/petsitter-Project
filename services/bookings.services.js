const BookingRepository = require('../repositories/bookings.repository');
class BookingService {
  bookingRepository = new BookingRepository();
  getBooking = async () => {
    const getBooking = await this.bookingRepository.getBooking();
    return getBooking;
  };
  createBooking = async (userId, petSitterId, startDay, endDay) => {
    try {
      if (!startDay) {
        return { code: 412, message: '시작날짜를 입력해주세요' };
      }
      if (!endDay) {
        return { code: 412, message: '종료날짜를 입력해주세요' };
      }
      if (!startDay || !endDay) {
        return { code: 412, message: '날짜를 선택해주세요' };
      }
      //   if (petSitterId) {
      //     return {
      //       code: 402,
      //       message: '예약이 불가능한 펫시터입니다. 다른 날짜 또는 다른 펫시터를 선택해주세요.',
      //     };
      //   }
      // try {

      return await this.bookingRepository.createBooking(userId, petSitterId, startDay, endDay);
    } catch (err) {
      return {
        code: 500,
        message: '예약 중 문제가 발생했습니다. 문제가 반복 될 경우 고객센터로 문의주세요',
      };
    }
  };
  updateBooking = async () => {};
  deleteBooking = async () => {};
}
module.exports = BookingService;
