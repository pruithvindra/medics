const user = require( "../models/user");
const factory = require( "./factory_handler");

// exports.createPatient =factory.createOne(Patient);
exports.getAllUsers=factory.getAll(user);
// exports.updatePatient = factory.updateOne(Patient);
// exports.getPatient = factory.getOne(Patient);