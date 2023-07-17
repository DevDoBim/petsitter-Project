const express = require('express');
const router = express.Router();

const BookingController = require('../controllers/bookings.controllers');
const bookingController = new BookingController();
router.post('/', bookingController.getbooking);
router.post('/', bookingController.booking);

module.exports = router;
