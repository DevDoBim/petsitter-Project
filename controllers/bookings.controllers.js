const BookingService = require('../services/bookings.services');
class BookingController {
  bookingService = new BookingService();

  //예약 조회
  getBooking = async (req, res) => {
    // const userId = ?
    // const petSitterId = ?

    const getBooking = await this.bookingService.getBooking();
    if (!getBooking) {
      res.status(400).json({ message: '예약 내역이 존재하지 않습니다!' });
    }
    res.status(200).json({ message: getBooking });
  };
  // 예약 생성
  createBooking = async (req, res) => {
    const petSitterId = 1;
    const userId = 1;
    const { startDay, endDay } = req.body;

    const { code, message } = await this.bookingService.createBooking(
      userId,
      petSitterId,
      startDay,
      endDay
    );

    res.status(code).json({ message });
  };
  //예약 수정
  updateBooking = async (req, res, next) => {
    // const { petSitterId } = ?
    // const userId = ?
    // const {bookingId} = req.params;
    const { startDay, endDay } = req.body;
  };

  //예약 취소
  deleteBooking = async (req, res, next) => {
    const { bookingId } = req.params;
  };
}
module.exports = BookingController;
