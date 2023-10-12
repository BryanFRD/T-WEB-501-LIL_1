const router = require('express').Router();
const AdController = require('../controllers/ad.controller.js');

const adController = new AdController();

router.get('/admins', adController.findAll);
router.get('/admins/:id', adController.findByPk);
router.post('/admins', adController.create);
router.put('/admins/:id', adController.update);
router.delete('/admins/:id', adController.delete);

module.exports = router;