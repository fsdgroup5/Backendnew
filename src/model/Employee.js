const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Employee = new Schema({
   name: {
      type: String
   },
   userid: {
    type: String
   },
   email: {
      type: String
   },
   department: {
      type: String
   },
   phoneNumber: {
      type: Number
   },
   password: {
    type: String
   }
}, {
   collection: 'userdtls'
})
module.exports = mongoose.model('Employee', Employee)