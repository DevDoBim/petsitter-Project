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
    const { petSitterId } = req.params;
    const userId = res.locals.user;
    console.log(userId);
    const { startTime, endTime } = req.body;
    console.log(startTime);
    console.log(endTime);
    // try {
    if (!startTime) {
      res.status(400).json({ message: '시작 날짜가 입력되지 않았습니다.' });
    }
    if (!endTime) {
      res.status(400).json({ message: '종료 날짜가 입력되지 않았습니다.' });
    }
    if (!startTime || !endTime) {
      res.status(400).json({ message: '와요 방문일자를 입력해주세요.' });
    }
    // if (petSitterId) {
    //   res.status(402).json({
    //     message: '예약이 불가능한 펫시터입니다. 다른 날짜 또는 다른 펫시터를 선택해주세요.',
    //   });
    // }

    const bookingData = await this.bookingService.createBooking(
      userId,
      petSitterId,
      startTime,
      endTime
    );
    console.log('cont', bookingData);

    res.status(200).json({ message: bookingData });
    // } catch (err){
    //   res.status(500).json({
    //     message: '예약 중 문제가 발생했습니다. 문제가 반복 될 경우 고객센터로 문의주세요',
    //   });
    // }
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
