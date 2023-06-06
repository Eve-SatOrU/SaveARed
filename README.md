# Blood Donation System -SaveARed-
![SaveARed](./public/images/heartbeat-solid.svg)

The Blood Donation System is a web application that allows users to register as donors or receivers and facilitates the process of connecting blood donors with receivers in need. Donors can sign up, provide their blood type, and make themselves available for blood donations. Receivers can search for donors based on blood type and request blood donations.

## Features

- User registration: Users can create an account as donors or receivers.
- User authentication: Secure login and logout functionality.
- User roles: Differentiate between donors and receivers and admin.
- Donor landing page: Donors can can access the appointment form.
- Receiver landing page: Receivers can access the request form.
- profile:Donors and Receivers can see their profile.
- history:Donors and Receivers can see their history.
- notification:Donors and Receivers can see their notification.
- Admin dashboard: Admins can manage user accounts accept and delete appointment and request and system operations.
- blood bank:admin manage blood bank. 


## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework
- Sequelize: ORM for database management
- Pug: Template engine for rendering views
- MySQL: Relational database for storing user and donation data

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Set up the database:
   - Create a MySQL database for the project.
   - Update the database configuration in `util/database.js`.
5. Start the application: `npm start`
6. Access the application in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request.

## License

[MIT License](https://opensource.org/licenses/MIT)
## Contact
Eve-SatOrU