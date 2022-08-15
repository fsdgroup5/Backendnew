var express = require('express');
const cors = require('cors');
var bodyparser = require('body-parser');
const {verifyToken, verifyUserToken} = require('./src/controller/Token');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var app = new express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());


// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

const HallRouter = require('./src/routes/hallRouter');
const AdminLoginRouter = require('./src/routes/AdminLoginRouter');
const UserLoginRouter = require('./src/routes/UserLoginRouter');
const BookingRouter = require('./src/routes/bookinRouter');
const employeeRoute = require('./src/routes/employee.route');

app.use('/api/halls/', HallRouter);
app.use('/api/booking' , BookingRouter);
app.use('/api/adminLogin', AdminLoginRouter);
app.use('/api/userLogin', UserLoginRouter);
app.use('/api/employee',employeeRoute)


const PORT = (process.env.PORT || 3000);
app.listen(PORT, function () {
  console.log('listening to port ' + PORT);
});
