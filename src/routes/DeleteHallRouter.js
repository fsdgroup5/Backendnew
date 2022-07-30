const express=require('express');
const DeleteHallRouter=new express();
const HallData=require('../model/Hall');

DeleteHallRouter.delete('/:id',(req,res)=>{
   
    id = req.params.id;
    console.log(id);
    HallData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
})
 
module.exports=DeleteHallRouter