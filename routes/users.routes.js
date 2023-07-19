const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/signup', usersController.signupUser);
router.post('/login', usersController.loginUser);
router.get('/user', authMiddleware, usersController.getUser);
router.put('/user', authMiddleware, usersController.updateUser);
router.delete('/user', authMiddleware, usersController.deleteUser);

module.exports = router;
