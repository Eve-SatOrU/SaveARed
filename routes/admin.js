//routes
const express = require('express');
const session = require('express-session');
const router = express.Router();
const adminController = require('../controllers/admin');
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postlogin);
router.get('/dashboard', adminController.getDashboard);
//reciever space
router.post('/accept-receiver/:id', adminController.postAcceptReceiver);
router.post('/delete-receiver/:id', adminController.deleteReceiver);
//notification
router.post('/notifications', adminController.postrecieverform);
router.get('/notifications', adminController.getrecieverform);
//forms recievers
router.post('/form-submission', adminController.postRequestForm);
router.get('/form', adminController.getformAdmin);
router.get('/forms/:id/details', adminController.getFormEachUser);
router.post('/forms/:id/accept', adminController.acceptForm);
router.post('/forms/:id/delete', adminController.deleteForm);
//donor space
router.post('/accept-donor/:id', adminController.postAcceptDonor);
router.post('/delete-donor/:id', adminController.deleteDonor);
//donor space
router.post('/appoinment-submission', adminController.createAppointment);
//all appointts 
router.get('/appointment', adminController.getappointmentAdmin);
router.get('/appointments/:id/details', adminController.getAppointmentEachUser);
router.post('/appointments/:id/accept', adminController.acceptAppointment);
router.post('/appointments/:id/delete', adminController.deleteAppointment);










module.exports = router;
