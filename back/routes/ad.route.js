const router = require('express').Router();
const AdController = require('../controllers/ad.controller.js');

const addController = new UserDataController();

router.get('/users', userController.findAll);
router.get('/users/:id', userController.findByPk);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;