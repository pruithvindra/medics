const { Module } = require("module");
const mongoose = require( "mongoose");

const hospitalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  Address: {
    type: String,
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


}, { versionKey: false })
const Hospital = mongoose.model('Hospital', hospitalSchema)

module.exports = Hospital;