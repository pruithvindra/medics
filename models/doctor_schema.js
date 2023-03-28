const { Module } = require("module");
const mongoose = require( "mongoose");


const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  workingDays: {
    type: [String],
    required: true,

    default: [1,2,3,4,5,6,7]
  },
  specialization: {
    type: String,
    required: true,

    default : "general med"
  },
  gender: {
    type: String,
    required: true  ,

    enum: ["male", "female"]
  },
  age: {
    type: Number,
    required: false
  },
  expierence: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
//   hospitals : [
//   {  hospital : {
//     type:mongoose.Schema.Types.ObjectId,
//     required: false,
//  ref: 'Hospital'
//     }}
//   ],
  consultationFee: {
    type: Number,
    required: true
  }

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
}, { versionKey: false });

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor;