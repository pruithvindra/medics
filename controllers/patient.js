const Patient = require( "../models/patient_schema");
const factory = require( "./factory_handler");

exports.createPatient =factory.createOne(Patient);
exports.getAllPatients=factory.getAll(Patient);
exports.updatePatient = factory.updateOne(Patient);
exports.getPatient = factory.getOne(Patient);