const express = require('express');
const router = express.Router();

const BookingController = require('../controllers/bookings.controllers');
const bookingController = new BookingController();
router.get('/booking', bookingController.getBooking);
router.post('/booking', bookingController.createBooking);
router.put('/booking/bookingId', bookingController.updateBooking);
router.delete('/booking/bookingId', bookingController.deleteBooking);
module.exports = router;
