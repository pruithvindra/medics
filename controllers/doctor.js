const Doctor = require( "../models/doctor_schema");
const factory = require( "./factory_handler");

exports.createDoctor =factory.createOne(Doctor);
exports.getAllDoctor=factory.getAll(Doctor);
exports.updateDoctor = factory.updateOne(Doctor);
exports.getDoctor = factory.getOne(Doctor);