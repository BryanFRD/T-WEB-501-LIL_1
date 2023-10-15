const router = require('express').Router();
const AdminController = require('../controllers/admin.controller.js');

const adminController = new AdminController();

router.get('/admins', adminController.findAll);
router.get('/admins/:id', adminController.findByPk);
router.post('/admins', adminController.create);
router.put('/admins/:id', adminController.update);
router.delete('/admins/:id', adminController.delete);
router.delete('/admins/:id/restore', adminController.restore);

module.exports = router;