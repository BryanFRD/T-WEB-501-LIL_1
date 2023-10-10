const router = require('express').Router();
const UserDataController = require('../controllers/userdata.controller.js');

const userController = new UserDataController();

router.get('/users', userController.findAll);
router.get('/users/:id', userController.findByPk);
router.delete('/users/:id', userController.delete);

module.exports = router;