const express = require("express");
const UserLoginRouter = express.Router();
const UserData = require("../model/Employee");
//UserLoginRouter.use(express.urlencoded({extended:true}));
//UserLoginRouter.use(express.json());
const jwt = require('jsonwebtoken')

UserLoginRouter.post('', (req, res) => {
    let userData1 = req.body
    UserData.findOne({"username":userData1.userid,"password":userData1.password}).then((data)=>{
     console.log(data)
     if (data===null) {
       res.status(401).send('Invalid Username and password!!')
     } else if(data.userid===userData1.userid && data.password===userData1.password){
       let payload = {subject: userData1.userid+userData1.password}
       let token = jwt.sign(payload, 'secretKey')
       res.status(200).send({token})
     }
     else{
       res.status(401).send('Invalid Username and password!!')
     }
   });
    
 })
 module.exports=UserLoginRouter
