const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
// const bookingsRouter = require('./bookings.routes');
const reviewsRouter = require('./reviews.routes');

router.use('/', usersRouter);
// router.use('/', bookingsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
