const express = require("express");
const AdminLoginRouter = express.Router();
const AdminData = require("../model/admin");
const jwt = require('jsonwebtoken')

AdminLoginRouter.post('', (req, res) => {
    let adminData1 = req.body
    AdminData.findOne({"username":adminData1.username,"password":adminData1.password}).then((data)=>{
   
     if (data===null) {
       res.status(401).send('Invalid Username and password!!')
     } else if(data.username===adminData1.username && data.password===adminData1.password){
       let payload = {subject: adminData1.username+adminData1.password}
       let payload1={subject: adminData1.password}
       let token = jwt.sign(payload, 'secretKey')
       let isAdmin=jwt.sign(payload, 'adminKey')
       res.status(200).send({token,isAdmin})
     }
     else{
       res.status(401).send('Invalid Username and password!!')
     }
   });
    
 })
 module.exports=AdminLoginRouter