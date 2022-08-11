const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventsSchema = new Schema({
    _id:String,
    title: String,
    start: String,
    end: String,
    username: String
    });

var eventdata = mongoose.model('event', eventsSchema);                        

module.exports = eventdata;