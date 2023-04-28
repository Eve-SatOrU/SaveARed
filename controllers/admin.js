const config =require('../config');
exports.getLogin = (req, res, next) => {
    res.render('admin/loginAdmin');
  };
exports.postlogin = (req, res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === config.medcinresposable.username && password === config.medcinresposable.password) {
      req.session.ismedcinresposable = true;
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/admin/login');
    }
  };
  
//get admin
exports.getDashboard = (req, res, next) => {
    if (req.session.ismedcinresposable) {
      res.render('admin/dashboard', {
        pageTitle: 'Dashboard',
        path: '/admin/dashboard'
      });
    } else {
      res.redirect('/admin/login');
    }
  };
  