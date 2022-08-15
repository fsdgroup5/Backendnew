const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    name: String,
    password: String,
    username: String,
    email: String,
    Department: String
});

var Userdata = mongoose.model('userdtls', NewUserSchema);                        

module.exports = Userdata;