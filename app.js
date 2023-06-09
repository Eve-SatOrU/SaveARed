const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const fs = require('fs');
const config = require('./config');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static('public'));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
//admin routes
const adminRoutes = require('./routes/admin');
const routes = require('./routes/routes');
app.use('/', routes);

const userController = require('./controllers/usercontroller');
const adminController =require('./controllers/admin');
const errorController = require('./controllers/error.js');

app.use('/admin', adminRoutes);
 // app.use(express.json());
 //error
app.use(errorController.get404);

//admin stuff

const adminUsername = config.medcinresposable.username;
const adminPassword = config.medcinresposable.password;
//db
// const sequelize = require('./util/database');
const User = require('./models/user');
const Request = require('./models/request');
const Appointment = require('./models/appointment');
const Notification = require('./models/notification');
const bloodbank =require('./models/bloodbank');


 sequelize.sync().then(() => {
// sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}).catch(error => console.log(error));

