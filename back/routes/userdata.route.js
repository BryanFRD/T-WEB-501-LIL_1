const router = require('express').Router();
const UserDataController = require('../controllers/userdata.controller.js');

const userDataController = new UserDataController();

router.get('/userdata', userDataController.findAll);
router.get('/userdata/:id', userDataController.findByPk);
router.post('/userdata', userDataController.create);
router.put('/userdata/:id', userDataController.update);
router.delete('/userdata/:id', userDataController.delete);
router.delete('/userdata/:id/restore', userDataController.restore);

module.exports = router;