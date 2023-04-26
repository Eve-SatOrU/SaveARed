//add api google
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const User = require('./models/user');
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

const routes = require('./routes/routes');
app.use('/', routes);

const userController = require('./controllers/usercontroller');
const errorController = require('./controllers/error.js');
// app.use(errorController.get404);
 // app.use(express.json());

//  sequelize.sync().then(() => {
sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}).catch(error => console.log(error));

