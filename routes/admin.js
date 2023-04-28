//routes
const express = require('express');
const session = require('express-session');
const router = express.Router();
const adminController = require('../controllers/admin');
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postlogin);
router.get('/dashboard', adminController.getDashboard);
module.exports = router;
