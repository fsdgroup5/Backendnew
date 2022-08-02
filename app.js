var express=require('express');
const HallData=require('./src/model/Hall');
const cors = require('cors');
const  AdminData= require('./src/model/admin');
const  BookingData= require('./src/model/bookings');
const  userData= require('./src/model/users');

const jwt = require('jsonwebtoken')
const path = require("path");

var bodyparser=require('body-parser');

var app = new express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyparser.json());


const AddHallRouter=require('./src/routes/AddHallRouter');
const EditHallRouter=require('./src/routes/EditHallRouter');
const DeleteHallRouter=require('./src/routes/DeleteHallRouter');
const AdminLoginRouter=require('./src/routes/AdminLoginRouter');
const UserLoginRouter=require('./src/routes/UserLoginRouter');

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }


// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/insert",verifyToken, AddHallRouter);
app.use('/update',EditHallRouter);
app.use('/remove',DeleteHallRouter);
app.use('/adminLogin',AdminLoginRouter);
app.use('/userLogin',UserLoginRouter);

app.get('/Halls',verifyToken,(req,res)=>{
    HallData.find().then(function(Halls){
        res.send(Halls);
    })
})


app.get('/:username',  (req, res) => {
  
  const username = req.params.username;
  console.log(username);
   BookingData.find({"UserName":username})
    .then((data)=>{
        res.send(data);
       
    });
})

app.delete('/remove/:id',(req,res)=>{
   id = req.params.id;
   BookingData.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})


  

const PORT = (process.env.PORT || 3000);
app.listen(PORT, function(){
    console.log('listening to port ' +PORT);
});