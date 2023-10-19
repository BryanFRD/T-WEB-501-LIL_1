const router = require('express').Router();
const AdController = require('../controllers/ad.controller.js');

const adController = new AdController();

router.get('/ads', adController.findAll);
router.get('/ads/:id', adController.findByPk);
router.get('/ads/:id/company', adController.findCompany);
router.get('/ads/:id/contracttypes', adController.findContractTypes);
router.get('/ads/:id/appliers', adController.findAppliers);
router.post('/ads', adController.create);
router.put('/ads/:id', adController.update);
router.delete('/ads/:id', adController.delete);
router.delete('/ads/:id/restore', adController.restore);

module.exports = router;