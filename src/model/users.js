const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/HallBookingPortal');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    username: String,
    password: String,
    UserId: String,
    UserMailId: String,
    Department: String
});

var Userdata = mongoose.model('userdtls', NewUserSchema);                        

module.exports = Userdata;