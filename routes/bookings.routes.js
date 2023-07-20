const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware.js');
const router = express.Router();

const BookingController = require('../controllers/bookings.controllers');
const bookingController = new BookingController();

router.get('/', authMiddleware, bookingController.getBooking);
router.post('/:petSitterId', authMiddleware, bookingController.createBooking);
router.put('/:bookingId', authMiddleware, bookingController.updateBooking);
router.delete('/:bookingId', authMiddleware, bookingController.deleteBooking);

module.exports = router;
