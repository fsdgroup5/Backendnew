const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var NewBookingSchema = new Schema({
    UserName: String,
    UserMailId: String,
    HallName: String,
    DateOfBooking: String,
    TimeSlot:String,
    Status:String
    });

var Bookingdata = mongoose.model('bookingdtls', NewBookingSchema);                        

module.exports = Bookingdata;