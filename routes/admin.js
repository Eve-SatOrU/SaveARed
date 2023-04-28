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
// router.post('/post-receiver-form',adminController.postReceiverForm)
module.exports = router;
