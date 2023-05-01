//routes
const express = require('express');
const session = require('express-session');
const router = express.Router();
const adminController = require('../controllers/admin');
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postlogin);
router.get('/dashboard', adminController.getDashboard);
router.post('/accept-receiver/:id', adminController.postAcceptReceiver);
router.post('/delete-receiver/:id', adminController.deleteReceiver);
router.post('/form-submission', adminController.postRequestForm);
router.post('/notifications', adminController.postrecieverform);
router.get('/notifications', adminController.getrecieverform);
router.get('/form', adminController.getformAdmin);
router.get('/forms/:id/details', adminController.getFormEachUser);
router.post('/forms/:id/accept', adminController.acceptForm);
router.post('/forms/:id/delete', adminController.deleteForm);








module.exports = router;
