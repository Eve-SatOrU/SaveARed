const config =require('../config');
// const Receiver = require('../models/user');
const BloodBank= require('../models/bloodbank');
const Appointment = require('../models/appointment');
const Request = require('../models/request');
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
  
  exports.getDashboard = async (req, res, next) => {
    try {
      if (req.session.ismedcinresposable) {
        const receivers = await User.findAll({ where: { userType: 'receiver' } });
        const donors = await User.findAll({ where: { userType: 'donor' } });
        const appointments = await Appointment.findAll({include: {model: User,as: 'donor'}});        
        const forms = await Request.findAll({ include: [{ model: User }] });
        res.render('admin/dashboard', {
          pageTitle: 'Dashboard',
          path: '/admin/dashboard',
          receivers,
          donors,
          appointments,
          forms
        });
      } else {
        res.redirect('/admin/login');
      }
    } catch (error) {
      console.error(error);
    }
  };
    //accept and delete reciver 
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

//for notification
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

//all forms
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


//donor space 
  //accept and delete reciver :

  exports.postAcceptDonor = (req, res, next) => {
    const donorId = req.params.id;
  
    // Find the receiver in the database
    Donor.findByPk(donorId)
      .then(donor => {
        // Accept the receiver by updating the accepted field to true
        donor.accepted = true;
        return donor.save();
      })
      .then(result => {
        // Redirect to the admin dashboard
        res.redirect('/admin/dashboard');
      })
      .catch(err => console.log(err));
  };
  //delete donor
  exports.deleteDonor = (req, res, next) => {
    const donorId = req.params.id;
    console.log("Donor ID: ", donorId);
  
    User.destroy({
      where: {
        id: donorId,
        userType: 'donor'
      }
    })
    .then(() => {
      res.redirect('/admin/dashboard');
    })
    .catch(err => console.log(err));
  };

  // create a new appointment
  // exports.createAppointment = async (req, res) => {
  //   const { appointmentTime, appointmentDate } = req.body;
  //   try {
  //     // Fetch the user object from the database using the donorId
  //     const donor = await User.findOne({ where: { id: req.session.id } });
  
  //     // Create the appointment and associate it with the donor
  //     const appointment = await Appointment.create({
  //       appointmentDate,
  //       appointmentTime,
  //       status: 'pending',
  //       donor: donor, // associate the donor object with the appointment
  //     });
  
  //     res.redirect('/');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
// //appointment of each donor
exports.getAppointmentEachUser = async (req, res) => {
  const id = req.params.id;
  const appointment = await Appointment.findByPk(id);
  res.render('admin/appointment-details', { appointment });
};

//all forms
exports.getappointmentAdmin = async (req, res, next) => {
  if (!req.session.ismedcinresposable) {
      return res.redirect('/admin/login');
  }

  try {
      // Get all the donors with their associated user data
      const donors = await Donor.findAll({
          include: {
              model: User,
              attributes: ['userName'],
          },
      });

      // Fetch all appointments for all donors
      const appointments = await Appointment.findAll({ where: { donorId: donors.map(donor => donor.id) } });

      // Render the view with the form data and appointments
      res.render('admin/appointments', { donors, appointments });
  } catch (error) {
      next(error);
  }
};

//accept and delete appontments
//accept and delete appontments
exports.acceptAppointment = async (req, res) => {
  const id = req.params.id;
  const appointment = await Appointment.findByPk(id, {
    include: [
      {
        model: User,
        as: 'donor',
      },
    ],
  });
  
  if (!appointment) {
    res.status(404).send('Form not found');
    return;
  }
  appointment.status = 'accepted';
  await appointment.save();

  // Add the accepted appointment to the blood bank stock
  await createBloodBankRecord(appointment.bloodType);

  console.log("it work");
  res.redirect('/admin/dashboard');
};

exports.deleteAppointment = async (req, res) => {
  // Extract the ID parameter from the request
  const id = req.params.id;

  // Find the form submission with the given ID
  const appointment = await Appointment.findByPk(id);

  // If the form does not exist, send a 404 error response
  if (!appointment) {
    res.status(404).send('Form not found');
    return;
  }
  // Delete the form submission from the database
  await appointment.destroy();
  res.redirect('/admin/dashboard');
};

//blood bank space 

// Create new blood bank record for a donor's appointment
const createBloodBankRecord = async (bloodType) => {
  const bloodBankRecord = await BloodBank.findOne({ where: { bloodType } });
  if (bloodBankRecord) {
    bloodBankRecord.quantity += 1;
    await bloodBankRecord.save();
  } else {
    await BloodBank.create({ bloodType, quantity: 1 });
  }
};
// Create new appointment and blood bank record
exports.createAppointment = async (req, res) => {
  const { appointmentTime, appointmentDate, bloodType } = req.body;
  try {
    const id = req.session.userId;
    const user = await User.findByPk(id);
    console.log("id issssssssss",id);

    // Check if the user is a donor
    if (user && user.userType === 'donor') {
      // Create the appointment record, using the user's ID and blood type
      const appointment = await Appointment.create({
        appointmentDate,
        appointmentTime,
        status: 'pending',
        donorId: user.id,
        bloodType
      });

      // Create a new blood bank record for the donor's blood type
      // await createBloodBankRecord(bloodType);

      res.redirect('/');
    } else {
      throw new Error('User not found or not a donor');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

//get all blood bank
//get all blood bank records
exports.getBloodBank = async (req, res) => {
  try {
    const bloodBankRecords = await BloodBank.findAll();
    res.render('admin/blood-bank', { bloodBankRecords });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving blood bank records');
  }
}
