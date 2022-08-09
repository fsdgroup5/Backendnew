const express=require('express');
const NewBookingRouter=new express();
const BookingData=require('../model/bookings');
const userData=require('../model/users')

const nodemailer = require("nodemailer");

NewBookingRouter.post('',(req,res)=>{
    // console.log(req.body);
    Hall=req.body.BookingDetails.Hallname,
    BookingDate=req.body.BookingDetails.Date,
    Time=req.body.BookingDetails.Time,
    User=req.body.BookingDetails.Username
      var bookingdtls={
        HallName: Hall,
        DateOfBooking: BookingDate,
        TimeSlot:Time,
        UserName:User,
        Class:req.body.BookingDetails.Class
      }
      var bookingdtls= new BookingData(bookingdtls);
      bookingdtls.save();
      userData.findOne({"username":User}).then((data)=>{
          userMail=data.UserMailId;

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
              subject: "ICT Hall Booking Confirmation", // Subject line
              // text: "Hello " +User+ "Your Booking Has Been confirmed", // plain text body
              html: "<h3>Hello <b style='text-transform: uppercase'>"+User+"</b> Your Booking Has Been confirmed</h3> <br><b>Booking Date : "+BookingDate+"</b> <br> <b>HallName : "+Hall+"</b> <br> <b>TimeSlot : "+Time+"</b>",
           
            });
          
            // console.log("Message sent: %s", info.messageId,userMail);
            
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
          
          main().catch(console.error);
      });
      
    })
    
  module.exports=NewBookingRouter