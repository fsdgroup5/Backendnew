const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewAdminSchema = new Schema({
    username: String,
    password: String,
  
});
var Admindata = mongoose.model('admin', NewAdminSchema);                        

module.exports = Admindata;