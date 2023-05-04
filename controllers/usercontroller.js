const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Request = require('../models/request');
exports.getindex =(req,res,next)=>{
    res.render('index',{title:'index'});
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
    exports.postRegister = async (req, res,next) => {
      const { userName, userPassword,email,userType } = req.body;
      try {
        const user = await User.create({ userName, userPassword,email ,userType});
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
      res.redirect('/appointment-form');
    } else {
      req.session.user = user;
      req.session.userName = userName;
      req.session.userType = 'receiver';
      res.redirect('/landing');
    }
  });
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
//reciever form 
// exports.postlanding=(req, res,next) => {
//   console.log('Session:', req.session); // Add this line
//   if (req.session.userType === 'receiver') {
//     res.render('reciever-landing', { userName: req.session.userName });
//   }else{
//     res.redirect('/login');
//   }
// };
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


// create a new appointment
// exports.createAppointment = async (req, res) => {
//   const { fullName, email, phoneNumber, appointmentDate } = req.body;
//   try {
//     const appointment = await Appointment.create({
//       fullName,
//       email,
//       phoneNumber,
//       appointmentDate,
//       status: 'pending',
//       donorId: req.session.userId
//     });
//     res.redirect(`/donor/appointments/${appointment.id}`);
//   } catch (error) {
//     console.error(error);
//     res.redirect('/donor/appointments/new');
//   }
// };

// get a donor's appointments
// exports.getAppointments = async (req, res) => {
//   if (req.session && req.session.userType === 'donor') {
//     const appointments = await Appointment.findAll({ where: { donorId: req.session.userId } });
//     res.render('donor-appointments', { appointments });
//   } else {
//     res.redirect('/login');
//   }
// };

// // view a specific appointment
// exports.viewAppointment = async (req, res) => {
//   if (req.session && req.session.userType === 'donor') {
//     const appointment = await Appointment.findByPk(req.params.id);
//     if (!appointment || appointment.donorId !== req.session.userId) {
//       return res.redirect('/donor/appointments');
//     }
//     res.render('donor-appointment', { appointment });
//   } else {
//     res.redirect('/login');
//   }
// };

