const { Module } = require("module");
const mongoose = require( "mongoose");

const doctorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
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
  hospitals : [
  {  hospital : {
    type:mongoose.Schema.Types.ObjectId,
    required: true,
 ref: 'Hospital'
    }}
  ]
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
}, { versionKey: false })
const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor;