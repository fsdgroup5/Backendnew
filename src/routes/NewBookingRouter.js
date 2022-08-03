const express=require('express');
const NewBookingRouter=new express();
const BookingData=require('../model/bookings')

NewBookingRouter.post('',(req,res)=>{
    console.log(req.body);
      var bookingdtls={
        HallName: req.body.BookingDetails.Hallname,
        DateOfBooking: req.body.BookingDetails.Date,
        TimeSlot:req.body.BookingDetails.Time,
        UserName: req.body.BookingDetails.Username,
        Class:req.body.BookingDetails.Class
      }
      var bookingdtls= new BookingData(bookingdtls);
      bookingdtls.save();
    })
    
  module.exports=NewBookingRouter