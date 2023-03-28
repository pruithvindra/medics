const Appointment = require( "../models/appointment_schema");
const factory = require( "./factory_handler");

exports.createAppointment =factory.createOne(Appointment);
exports.getAllAppointment=factory.getAll(Appointment);
exports.updateAppointment = factory.updateOne(Appointment);
exports.getAppointment = factory.getOne(Appointment);