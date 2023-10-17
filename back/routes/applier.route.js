const router = require('express').Router();
const ApplierController = require('../controllers/applier.controller.js');

const applierController = new ApplierController();

router.get('/appliers', applierController.findAll);
router.get('/appliers/:id', applierController.findByPk);
router.get('/appliers/:id/ad', applierController.findAd);
router.post('/appliers', applierController.create);
router.put('/appliers/:id', applierController.update);
router.delete('/appliers/:id', applierController.delete);
router.delete('/appliers/:id/restore', applierController.restore);

module.exports = router;