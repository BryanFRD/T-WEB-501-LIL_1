const router = require('express').Router();
const AuthController = require('../controllers/auth.controller.js');

const authController = new AuthController();

router.get('/auth/isadmin', authController.isAdmin);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.delete('/auth/logout', authController.logout);
router.post('/auth/refresh', authController.refresh);

module.exports = router;