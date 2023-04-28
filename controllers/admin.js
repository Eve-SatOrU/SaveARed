const config =require('../config');
// const Receiver = require('../models/user');
const User = require('../models/user');
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
    User.findAll({ where: { userType: 'receiver' } })
      .then(receivers => {
        res.render('admin/dashboard', {
          pageTitle: 'Dashboard',
          path: '/admin/dashboard',
          receivers: receivers
        });
      })
      .catch(err => console.log(err));
  } else {
    res.redirect('/admin/login');
  }
};
  //accept and delete reciver :

exports.postAcceptReceiver = (req, res, next) => {
    const receiverId = req.params.id;
  
    // Find the receiver in the database
    Receiver.findByPk(receiverId)
      .then(receiver => {
        // Accept the receiver by updating the accepted field to true
        receiver.accepted = true;
        return receiver.save();
      })
      .then(result => {
        // Redirect to the admin dashboard
        res.redirect('/admin/dashboard');
      })
      .catch(err => console.log(err));
  };
  //delete
  exports.deleteReceiver = (req, res, next) => {
    const receiverId = req.params.id;
    console.log("Receiver ID: ", receiverId);
  
    User.destroy({
      where: {
        id: receiverId,
        userType: 'receiver'
      }
    })
    .then(() => {
      res.redirect('/admin/dashboard');
    })
    .catch(err => console.log(err));
  };