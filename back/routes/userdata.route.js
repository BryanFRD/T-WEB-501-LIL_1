const router = require('express').Router();
const AdController = require('../controllers/userdata.controller.js');

const adController = new AdController();

router.get('/ads', adController.findAll);
router.get('/ads/:id', adController.findByPk);
router.post('/ads', adController.create);
router.put('/ads/:id', adController.update);
router.delete('/ads/:id', adController.delete);

module.exports = router;