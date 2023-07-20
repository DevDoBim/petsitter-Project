const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const reviewsRouter = require('./reviews.routes');
// const bookingsRouter = require('./bookings.routes');

router.use('/', usersRouter);
// router.use('/', bookingsRouter);
router.use('/', reviewsRouter);
module.exports = router;
