const express = require("express");
const UserLoginRouter = express.Router();
const UserData = require("../model/users");
//UserLoginRouter.use(express.urlencoded({extended:true}));
//UserLoginRouter.use(express.json());
const jwt = require('jsonwebtoken')

UserLoginRouter.post('', (req, res) => {
    let userData1 = req.body
    UserData.findOne({"username":userData1.username,"password":userData1.password}).then((data)=>{
  
     if (data===null) {
       res.status(401).send('Invalid Username and password!!')
     } else if(data.username===userData1.username && data.password===userData1.password){
       let payload = {subject: userData1.username+userData1.password}
       let token = jwt.sign(payload, 'secretKey')
       let username=data.username;
       res.status(200).send({token,username})
     }
     else{
       res.status(401).send('Invalid Username and password!!')
     }
   });
    
 })
 module.exports=UserLoginRouter
