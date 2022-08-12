const express = require('express');
const BookingRouter = new express();
const BookingData = require('../model/bookings');
const userData = require('../model/users')
const eventdata = require('../model/events');
const nodemailer = require("nodemailer");
const {verifyToken, verifyUserToken} = require('../controller/Token');

  // events
  BookingRouter.get('/events/:username', function (req, res) {
    const username = req.params.username;
    eventdata.find({ 'username': username }).then(function (data) {
      res.send(data);
  
    });
  })
// new booking
BookingRouter.post('/newBooking',verifyUserToken, (req, res) => {
    // console.log(req.body);
    Hall = req.body.BookingDetails.Hallname,
      BookingDate = req.body.BookingDetails.Date,
      Time = req.body.BookingDetails.Time,
      User = req.body.BookingDetails.Username
  
    //converting time to 12hr
    EndTime = Time.slice(Time.length - 8);
    StartTime = Time.substring(0, 8);
    random_id = User + BookingDate + (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
    console.log((new Date()).getTime().toString(36) + Math.random().toString(36).slice(2));
    const StartTimeStr = new Date('1970-01-01T' + StartTime + 'Z')
      .toLocaleTimeString('en-US',
        { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
      );
    const EndTimeStr = new Date('1970-01-01T' + EndTime + 'Z')
      .toLocaleTimeString('en-US',
        { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
      );
    //
    var bookingdtls = {
      _id: random_id,
      HallName: Hall,
      DateOfBooking: BookingDate,
      TimeSlot: StartTimeStr + ' to ' + EndTimeStr,
      UserName: User,
      Class: req.body.BookingDetails.Class
    }
    var bookingdtls = new BookingData(bookingdtls);
    bookingdtls.save();
  
    var events = {
      _id: random_id,
      title: Hall,
      start: BookingDate + 'T' + StartTime,
      end: BookingDate + 'T' + EndTime,
      username: User,
    }
    var events = new eventdata(events);
    events.save();
  
    userData.findOne({ "username": User }).then((data) => {
      //userMail = data.UserMailId;
      userMail='dinushasivanunnip@gmail.com'
      async function main() {
        let testAccount = await nodemailer.createTestAccount();
  
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          service: 'gmail',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'fsdcgroup5@gmail.com', // generated ethereal user
            pass: 'xbcfmaobomhrzzxx', // generated ethereal password
          },
        });
  
        let info = await transporter.sendMail({
          from: 'fsdcgroup5@gmail.com', // sender address
          to: userMail, // list of receivers
          subject: "ICT Hall Booking Confirmation", // Subject line
          html: "<h3>Hello <b style='text-transform: uppercase'>" + User + "</b> Your Booking Has Been confirmed</h3> <br><b>Booking Date : " + BookingDate + "</b> <br> <b>HallName : " + Hall + "</b> <br> <b>TimeSlot : " +StartTimeStr + ' to ' + EndTimeStr +"</b>",
  
        });
      }
  
      main().catch(console.error);
    });
  
  })
  
BookingRouter.get('/userbookings/:username',verifyUserToken, (req, res) => {
    const username = req.params.username;
    const date = new Date();
  
    var ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
    offset = ISToffSet * 60 * 1000;
    var ISTTime = new Date(date.getTime() + offset);
    let dates = ISTTime.toISOString();
    let next = new Date();
    next.setDate(date.getDate() + 8)
    var today = dates.slice(0, 10);
    var nextDate = next.toISOString().slice(0, 10);
     BookingData.find({"UserName":username,"DateOfBooking":{$gte:today,$lt:nextDate}}).sort([['DateOfBooking']])
    // BookingData.find({"UserName":username,"DateOfBooking":{$gte:today,$lt:nextDate}})
    //BookingData.find({ "UserName": username }).sort([['DateOfBooking']])
      .then((data) => {
        res.send(data);
  
      });
  })



//Admin-booking Details
BookingRouter.get('/bookingdtls',verifyToken, function (req, res) {
  BookingData.find().sort([['DateOfBooking']]).then(function (dtls) {
    res.send(dtls);

  });
})

//Admin-booking History
BookingRouter.get('/bookingHistory',verifyToken, function (req, res) {
  const date = new Date();
  
  var ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
  offset = ISToffSet * 60 * 1000;
  var ISTTime = new Date(date.getTime() + offset);
  let dates = ISTTime.toISOString();
  var today = dates.slice(0, 10);
   BookingData.find({"DateOfBooking":{$lt:today}}).sort([['DateOfBooking']])
  .then(function (dtls) {
    res.send(dtls);

  });
})

BookingRouter.get('/upcomingBookings',verifyToken, function (req, res) {
  const date = new Date();
  
  var ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
  offset = ISToffSet * 60 * 1000;
  var ISTTime = new Date(date.getTime() + offset);
  let dates = ISTTime.toISOString();
  var today = dates.slice(0, 10);
   BookingData.find({"DateOfBooking":{$gte:today}}).sort([['DateOfBooking']])
  .then(function (dtls) {
    res.send(dtls);

  });
})

// remove booking
BookingRouter.delete('/remove_booking/:id', (req, res) => {
  id = req.params.id;
  BookingData.findOne({"_id":id}).then((data)=>{
    //userMail=data.UserMailId;
    userMail='dinushasivanunnip@gmail.com'
    async function main() {
      let testAccount = await nodemailer.createTestAccount();
    
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        service:'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'fsdcgroup5@gmail.com', // generated ethereal user
          pass: 'xbcfmaobomhrzzxx', // generated ethereal password
        },
      });
    
      let info = await transporter.sendMail({
        from: 'fsdcgroup5@gmail.com', // sender address
        to: userMail, // list of receivers  
        subject: "ICT Hall Booking Cancelled!!", // Subject line
        // text: "Hello " +User+ "Your Booking Has Been confirmed", // plain text body
        html: "<h3>Hello <b style='text-transform: uppercase'>"+data.UserName+"</b> Your Booking Has Been cancelled</h3> <br><b>Booking Date : "+data.DateOfBooking+"</b> <br> <b>HallName : "+data.HallName+"</b> <br> <b>TimeSlot : "+data.TimeSlot+"</b>",
     
      });
    }
    
    main().catch(console.error);
});


  BookingData.findByIdAndDelete({ "_id": id })
    .then(() => {
      res.send();
    })
  eventdata.findByIdAndDelete({ "_id": id })
    .then(() => {
      res.send();
    })
})


// timeslot
BookingRouter.get('/timeslot/:Hall/:Date/:Timeslot/:Username', async (req, res) => {
  dt = req.params.Date
  hall = req.params.Hall
  Time = req.params.Timeslot
  user = req.params.Username

  EndTime = Time.slice(Time.length - 8);
  StartTime = Time.substring(0, 8);
  const StartTimeStr = new Date('1970-01-01T' + StartTime + 'Z')
    .toLocaleTimeString('en-US',
      { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
    );

  const EndTimeStr = new Date('1970-01-01T' + EndTime + 'Z')
    .toLocaleTimeString('en-US',
      { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
    );
  CheckTime = StartTimeStr + ' to ' + EndTimeStr;
  const data = await BookingData.find({ DateOfBooking: dt, HallName: hall, TimeSlot: CheckTime });
  const data1 = await BookingData.find({ DateOfBooking: dt, UserName: user, TimeSlot: CheckTime });

  if (data.length === 0 && data1.length === 0) {
    res.status(200).send('success');
  }
  else if (data.length > 0 && data1.length > 0) {
    res.status(202).send('error');

  }
  else if (data.length > 0) {
    res.status(401).send('error');
  }
  else if (data1.length > 0) {
    res.status(201).send('success')
  }
})

BookingRouter.get('/datefilter/:startDate/:EndDate',(req,res)=>{
  startDate=req.params.startDate
  endDate=req.params.EndDate
  // BookingData.find({"UserName":username,"DateOfBooking":{$gte:today,$lt:nextDate}})
  BookingData.find({"DateOfBooking":{$gte:startDate,$lt:endDate}}).sort({"DateOfBooking":1})
  .then((data) => {
    res.send(data);
  });
})
  module.exports = BookingRouter