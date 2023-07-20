const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const bookingsRouter = require('./bookings.routes');

router.use('/', usersRouter);
router.use('/', bookingsRouter);
module.exports = router;
