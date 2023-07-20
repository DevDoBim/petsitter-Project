const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const petSittersRouter = require('./petsitters.routes');
const bookingsRouter = require('./bookings.routes');
const reviewsRouter = require('./reviews.routes');

router.use('/', usersRouter);
router.use('/petsitters', petSittersRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
