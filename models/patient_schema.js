
const mongoose = require( "mongoose");


const patientSchema = new mongoose.Schema({
  
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String },
    emergencyContact: {
        name: { type: String },
        phone: { type: String },
        relation: { type: String }
    },
//       appointments : [
//   {  hospital : {
//     type:mongoose.Schema.Types.ObjectId,
//     required: false,
//  ref: 'Hospital'
//     }}
//   ],
}

, { versionKey: false })
const Doctor = mongoose.model('Patient', patientSchema)

module.exports = Doctor;