const router = require('express').Router();
const CompanyController = require('../controllers/company.controller.js');

const companyController = new CompanyController();

router.get('/companies', companyController.findAll);
router.get('/companies/:id', companyController.findByPk);
router.post('/companies', companyController.create);
router.put('/companies/:id', companyController.update);
router.delete('/companies/:id', companyController.delete);
router.delete('/companies/:id/restore', companyController.restore);

module.exports = router;