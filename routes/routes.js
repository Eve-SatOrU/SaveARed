//routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
router.get('/', userController.getindex);
router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);
router.post('/login', userController.postLogin);
// router.get('/profile', userController.getProfile);
router.get('/reciever',userController.getreciever)
router.get('/logout', userController.getLogout);
module.exports = router;
