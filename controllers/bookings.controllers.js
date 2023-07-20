const BookingService = require('../services/bookings.services');

class BookingController {
  bookingService = new BookingService();
  //유저id로 예약 조회 API
  getBooking = async (req, res) => {
    try {
      const { userId } = res.locals.user;

      const bookings = await this.bookingService.getBooking(userId);

      return res.status(200).json({ bookings });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  // 예약 생성 API
  createBooking = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { petSitterId } = req.params;
      const { startTime, endTime } = req.body;

      if (!startTime || !endTime) {
        return res.status(412).json({ message: '시작, 종료 시간을 입력해주세요' });
      }
      if (startTime >= endTime) {
        return res.status(412).json({ message: '종료 날짜는 시작 날짜보다 이후여야 합니다.' });
      }

      const bookingData = await this.bookingService.createBooking(userId, petSitterId, startTime, endTime);

      return res.status(201).json({ message: '예약되었습니다!', bookingData });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //예약 수정 API
  updateBooking = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { bookingId } = req.params;
      const { startTime, endTime } = req.body;

      if (!startTime || !endTime) {
        return res.status(412).json({ message: '시작, 종료 시간을 입력해주세요' });
      }
      if (startTime >= endTime) {
        return res.status(412).json({ message: '종료 날짜는 시작 날짜보다 이후여야 합니다.' });
      }
      const updateDate = await this.bookingService.updateBooking(userId, bookingId, startTime, endTime);

      return res.status(200).json({ message: '예약이 수정되었습니다!', updateDate });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
  //예약 취소 API
  deleteBooking = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { bookingId } = req.params;

      await this.bookingService.deleteBooking(userId, bookingId);
      return res.status(200).json({ message: '예약이 취소되었습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}
module.exports = BookingController;
