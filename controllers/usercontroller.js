const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
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
    // const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    // if (!isPasswordValid) {
    //   return res.status(500).send('your password wrong try again!');
    // }
    req.session.user = user;
    return res.redirect('/');
  });
    exports.getprofile = async (req, res) => {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.render('profile', { user }); // passing the user object to the template
    };
    exports.getLogout=async(req, res) => {
    //show that user in the session
    console.log("User in session:", req.session.user);
      req.session.destroy();
      res.redirect('/');
  };
  
//reciever 
exports.getreciever=(req, res,next) => {
  if (req.session.role === 'receiver') {
    res.render('receiverForm');
  } else {
 res.console.log('hi')  }
};
