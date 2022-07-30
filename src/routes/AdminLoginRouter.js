const express = require("express");
const AdminLoginRouter = express.Router();
const AdminData = require("../model/admin");
//AdminLoginRouter.use(express.urlencoded({extended:true}));
//AdminLoginRouter.use(express.json());
const jwt = require('jsonwebtoken')

AdminLoginRouter.post('', (req, res) => {
    let adminData1 = req.body
    AdminData.findOne({"username":adminData1.username,"password":adminData1.password}).then((data)=>{
     console.log(data)
     if (data===null) {
       res.status(401).send('Invalid Username and password!!')
     } else if(data.username===adminData1.username && data.password===adminData1.password){
       let payload = {subject: adminData1.username+adminData1.password}
       let token = jwt.sign(payload, 'secretKey')
       res.status(200).send({token})
     }
     else{
       res.status(401).send('Invalid Username and password!!')
     }
   });
    
 })
 module.exports=AdminLoginRouter