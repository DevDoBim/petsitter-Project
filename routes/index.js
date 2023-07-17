const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');

router.use('/', usersRouter);

module.exports = router;
