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

app.get('/bookingdlts',(req,res)=>{
  BookingData.find().then(function(Halls){
      res.send(Halls);
  })
})


app.get('/:id',  (req, res) => {
  
    const id = req.params.id;
      HallData.findOne({"_id":id})
      .then((hall)=>{
          res.send(hall);
      });
  })
  

const PORT = (process.env.PORT || 3000);
app.listen(PORT, function(){
    console.log('listening to port ' +PORT);
});