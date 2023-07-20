const express = require('express');
const router = express.Router();
const login = require('../middlewares/auth-middleware.js');

const BookingController = require('../controllers/bookings.controllers');
const bookingController = new BookingController();
router.get('/:petSitterId/booking', bookingController.getBooking);
router.post('/:petSitterId/booking', login, bookingController.createBooking);
router.put('/:petSitterId/booking/bookingId', login, bookingController.updateBooking);
router.delete('/:petSitterId/booking/bookingId', login, bookingController.deleteBooking);
module.exports = router;
