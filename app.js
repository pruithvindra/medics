const express =  require('express');
const bodyParser = require( "body-parser");
const doctorRoutes = require( "./routes/doctor");
const hospitalRoutes = require( "./routes/hospitals");
const mongoose = require( "mongoose");

const app = express();
app.use(express.json()) 
    app.use (express.urlencoded({extended: false}))

    app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
       next();
   });

   
app.use(doctorRoutes)
app.use(hospitalRoutes)


app.use((req,res,next)=>{

    console.log("here");

})


mongoose.connect('mongodb+srv://pru:123456789d@cluster0.te02x.mongodb.net/Medics')
  .then(result => {


    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Ahmed",
    //       email: 'ahmed@ahmed.com',
    //       cart: {
    //         items: []
    //       }
    //     })
    //     user.save()
    //   }
    // })

    app.listen(3000);
  }).catch(err => {
    console.log(err)
  })
