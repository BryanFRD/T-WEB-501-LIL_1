const router = require('express').Router();
const ClientController = require('../controllers/client.controller.js');

const clientController = new ClientController();

router.get('/clients', clientController.findAll);
router.get('/clients/:id', clientController.findByPk);
router.post('/clients', clientController.create);
router.put('/clients/:id', clientController.update);
router.delete('/clients/:id', clientController.delete);
router.delete('/clients/:id/restore', clientController.restore);

module.exports = router;