const express = require("express");
const AddHallRouter = express.Router();
const HallData = require("../model/Hall");

AddHallRouter.post('',(req,res)=>{

    var Hall={
        HallName:req.body.Hall.HallName,
        Seats:req.body.Hall.Seats,
        Location:req.body.Hall.Location,
        Image:req.body.Hall.Image
    }
    var Hall= new HallData(Hall);
    Hall.save();
})

module.exports=AddHallRouter