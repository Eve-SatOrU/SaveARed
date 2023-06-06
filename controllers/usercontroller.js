const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Request = require('../models/request');
const Appointment = require('../models/appointment');
exports.getindex = async(req, res, next) => {
  const user = req.session.user;
  res.render('index', { user });
}
//hashing password
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt();
    user.userPassword = await bcrypt.hash(user.userPassword, salt);
  });
//login and register
exports.getRegister = (req, res, next) => {
    res.render('register', {
      path: '/register',
      pageTitle: 'register'
    });
  };
  exports.postRegister = async (req, res, next) => {
    const { userName, userPassword, email, userType, sex, dateOfBirth, phone, bloodGroup } = req.body;
    try {
      const user = await User.create({
        userName,
        userPassword,
        email,
        userType,
        sex,
        dateOfBirth,
        phone,
        bloodGroup
      });
      res.redirect('/login');
    } catch (error) {
      res.render('register', { error });
    }
  };
  
  exports.getLogin = (req, res, next) => {
    res.render('login', {
      path: '/login',
      pageTitle: 'login'
    });
  };
  exports.postLogin= (async (req, res) => {
    const { userName, userPassword } = req.body;
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(500).send('Something broke!');
    }
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isPasswordValid) {
      return res.status(500).send('your password wrong try again!');
    }
    if (user.userType === 'donor') {
      req.session.user = user;
      req.session.userName = userName;
      req.session.userType = 'donor';
      req.session.userId = user.id; // Store user ID in session
      // res.redirect('/appointment-form');
      res.redirect('/');
    } else {
      req.session.user = user;
      req.session.userName = userName;
      req.session.userType = 'receiver';
      req.session.userId = user.id; // Store user ID in session
      res.redirect('/');
      // res.redirect('/landing');
    }
  });
  // profile user 
      exports.getprofile = async (req, res) => {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.render('profile', { user }); // passing the user object to the template
    };
    //logout
    exports.getLogout=async(req, res) => {
    //show that user in the session
    console.log("User in session:", req.session.user);
      req.session.destroy();
      res.redirect('/');
  };  

// reciever form
exports.getlanding = (req, res, next) => {
  if (req.session && req.session.userType === 'receiver') {
    res.render('reciever-landing', {     userType: req.session.userType,
      userName: req.session.userName
   });
  } else {
    res.redirect('/login');
  }
};
//see all history  but it didn't work i wanna come later
exports.getFormHistory = async (req, res) => {
  if (req.session && req.session.userType === 'receiver') {
    const id = req.params.id;
    const forms = await Request.findAll({ where: { id } });
    res.render('form-history', { forms });
  } else {
    res.redirect('/login');
  }
};
//donor yatbara3 space 

// donor appointment form
exports.appointmentForm = async (req, res, next) => {
  if (req.session && req.session.userType === 'donor') {
    res.render('donor-appointment-form' ,{     userType: req.session.userType,
      userName: req.session.userName
   });
  } else {
    res.redirect('/login');
  }
};

//see all history
exports.getAppointmentHistory = async (req, res) => {
  if (req.session && req.session.userType === 'donor') {
    const id = req.params.id;
    const appointments = await Appointment.findAll({ where: { id } });
    res.render('appointment-history', { appointments  });
  } else {
    res.redirect('/login');
  }
};

exports.getcontact = async(req, res, next) => {
  const user = req.session.user;
  res.render('contact', { user });
}
exports.getabout = async(req, res, next) => {
  const user = req.session.user;
  res.render('about', { user });
}
