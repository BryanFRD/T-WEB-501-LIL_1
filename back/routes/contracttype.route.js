const router = require('express').Router();
const ContractTypeController = require('../controllers/contracttype.controller.js');

const contractTypeController = new ContractTypeController();

router.get('/contracttypes', contractTypeController.findAll);
router.get('/contracttypes/:id', contractTypeController.findByPk);
router.post('/contracttypes', contractTypeController.create);
router.put('/contracttypes/:id', contractTypeController.update);
router.delete('/contracttypes/:id', contractTypeController.delete);
router.delete('/contracttypes/:id/restore', contractTypeController.restore);

module.exports = router;