const config =require('../config');
// const Receiver = require('../models/user');
const User = require('../models/user');
const Request = require('../models/request');
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
  
//get admin dashboard
exports.getDashboard = (req, res, next) => {
  if (req.session.ismedcinresposable) {
    User.findAll({ where: { userType: 'receiver' } })
      .then(receivers => {
        Request.belongsTo(User, { foreignKey: 'id' }); // add this line
        Request.findAll({ include: User }) // add include option to include associated User model
          .then(forms => {
            res.render('admin/dashboard', {
              pageTitle: 'Dashboard',
              path: '/admin/dashboard',
              receivers: receivers,
              forms: forms 
            });
          })
          .catch(err => console.log(err));
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
//recieve form from reciever
// exports.postReceiverForm = (req, res, next) => {
//   const receiverId = req.body.id;
//   const status = req.body.status;

//   User.update({status: status}, {where: {id: receiverId}})
//     .then(() => {
//       res.redirect('/admin/dashboard');
//     })
//     .catch(err => console.log(err));
// };
exports.postRequestForm = (req, res, next) => {
  const { fullName, address, email, phoneNumber, bloodGroup, gender, quantity } = req.body;
  Request.create({
    fullName,
    address,
    email,
    phoneNumber,
    bloodGroup,
    gender,
    quantity,
  })
    .then(() => {
      res.redirect('/landing');
    })
    .catch((err) => console.log(err));
};


const Notification = require('../models/notification');
exports.postrecieverform = async (req, res, next) => {
  // ... create new receiver instance and save it to the database ...

  // create a new notification
  const message = `New request from ${req.body.fullName}`;
  const notification = await Notification.create({ message });

  // find the admin user
  const admin = await User.findOne({ where: { userName: config.medcinresposable.username } });
  
  // assign the notification to the admin
  await notification.setAdmin(admin);

  res.redirect('/');
}

exports.getrecieverform = async (req, res) => {
  // find all notifications and include the user associated with each notification
  const notifications = await Notification.findAll({ include: User });

  res.render('admin/notifications', { notifications });
};
//admin see froms of each user

// const { User, Receiver } = require('../models');

exports.getformAdmin = async (req, res, next) => {
  if (!req.session.ismedcinresposable) {
    return res.redirect('/admin/login');
  }

  try {
    // Get all the receivers with their associated user data
    const receivers = await Receiver.findAll({
      include: {
        model: User,
        attributes: ['userName'],
      },
    });

    // Render the view with the form data
    res.render('admin/forms', { receivers: receivers, receiver: receiver } );
  } catch (error) {
    next(error);
  }
};
//see form of each user

exports.getFormEachUser = async (req, res) => {
  const id = req.params.id;
  const form = await Request.findByPk(id);
  res.render('admin/form-details', { form });
};
//accept and delelete forms 
exports.acceptForm = async (req, res) => {
  const id = req.params.id;
  const form = await Request.findByPk(id);
  if (!form) {
    res.status(404).send('Form not found');
    return;
  }
  form.status = 'accepted';
  await form.save();
  console.log("it work");
  res.redirect('/admin/dashboard');
};

exports.deleteForm = async (req, res) => {
  // Extract the ID parameter from the request
  const id = req.params.id;

  // Find the form submission with the given ID
  const form = await Request.findByPk(id);

  // If the form does not exist, send a 404 error response
  if (!form) {
    res.status(404).send('Form not found');
    return;
  }

  // Delete the form submission from the database
  await form.destroy();

  // Redirect the user to the /admin/forms page
  res.redirect('/admin/dashboard');
};


