const router = require('express').Router();
const AuthController = require('../controllers/auth.controller.js');

const authController = new AuthController();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.post('/auth/refresh', authController.refresh);

module.exports = router;