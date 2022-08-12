const express=require('express');
const HallRouter=new express();
const HallData=require('../model/Hall')
const {verifyToken, verifyUserToken} = require('../controller/Token');
// new hall 
HallRouter.post('/addnewhall', verifyToken, async (req, res) => {
    hall = req.body.Hall.HallName;
    const data = await HallData.find({ "HallName": hall });
    if (data.length > 0) {
        res.status(401).send('error');
    }
    else {
        var Hall = {
            HallName: req.body.Hall.HallName,
            Seats: req.body.Hall.Seats,
            Location: req.body.Hall.Location,
            Image: req.body.Hall.Image
        }
        var Hall = new HallData(Hall);
        Hall.save();
        res.status(200).send('success');
    }
})


// Edit Hall
HallRouter.get('/update:id',verifyToken,  (req, res) => {
  
    const id = req.params.id;
      HallData.findOne({"_id":id})
      .then((hall)=>{
          res.send(hall);
      });
  })


HallRouter.put('/update',verifyToken,(req,res)=>{
    id=req.body._id,
    HallName= req.body.HallName,
    Seats = req.body.Seats,
    Location = req.body.Location,
    Image = req.body.Image,
  
   HallData.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "HallName":HallName,
                                "Seats":Seats,
                                "Location":Location,
                                "Image":Image,
                              }})
   .then(function(){
       res.send();
   })
  })

//   Delete hall
HallRouter.delete('/removehall:id',verifyToken,(req,res)=>{
   
    id = req.params.id;
    console.log(id);
    HallData.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
})
// full hall details

HallRouter.get('/halldetails',verifyUserToken, (req, res) => {
    HallData.find().then(function (Halls) {
      res.send(Halls);
    })
  })

  module.exports=HallRouter