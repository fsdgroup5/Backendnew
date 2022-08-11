const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewBookingSchema = new Schema({
    _id:String,
    UserName: String,
    UserMailId: String,
    HallName: String,
    DateOfBooking: String,
    TimeSlot:String,
    Status:String
    });

var Bookingdata = mongoose.model('bookingdtls', NewBookingSchema);                        

module.exports = Bookingdata;