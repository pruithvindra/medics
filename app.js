const express =  require('express');
const bodyParser = require( "body-parser");
const doctorRoutes = require( "./routes/doctor");
const hospitalRoutes = require( "./routes/hospitals");
const userRoutes = require( "./routes/user");
const patientRoutes = require( "./routes/patient");
const appointmentRoutes = require( "./routes/appointment");
const globalErrorHandler = require('./controllers/error_controller');

const dotenv = require('dotenv');
const { Error } = require('mongoose');

dotenv.config({ path: './config.env' });
const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

    app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
        console.log("id is tyu " + req.params);
        next();
        //throw new Error('Well, you may need another coffee :)')  
   });

   
   app.use('/api/v1/doctors', doctorRoutes);
   app.use('/api/v1/user', userRoutes);
  // app.use('/api/v1/appointments', hospitalRoutes);
   app.use('/api/v1/patients', patientRoutes);
   app.use('/api/v1/appointments', appointmentRoutes);
 // app.use(hospitalRoutes)


app.all('*', (req, res, next) => {
  const port = process.env.PORT || 3000;
  console.log(port);
  console.log("here");
  res.send("not found");
});

app.use(globalErrorHandler);

module.exports = app;
