const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const BookingController = require('../controllers/bookings.controllers');
const bookingController = new BookingController();
router.get('/booking', bookingController.getBooking);
router.post('/booking', login, bookingController.createBooking);
router.put('/booking/bookingId', login, bookingController.updateBooking);
router.delete('/booking/bookingId', login, bookingController.deleteBooking);
module.exports = router;
