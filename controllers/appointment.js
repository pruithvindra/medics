const Appointment = require("../models/appointment_schema");
const factory = require("./factory_handler");
const _ = require("lodash");
const catchAsync = require("./../utils/catchAsync");

exports.createAppointment = factory.createOne(Appointment);
exports.getAllAppointment = factory.getAll(Appointment);
//exports.updateAppointment = factory.updateOne(Appointment);
exports.getAppointment = factory.getOne(Appointment);

exports.updateAppointment = catchAsync(async (req, res, next) => {
  let body = {};
  let doc;
  if (req.user.role === "admin") {
    const pickedValues = _.pick(req.body, [
      "appointmentDate",
      "appointmentTime",
      "reasonForVisit",
      "symptoms",
      "diagnosis",
      "status",
      "prescriptions",
    ]);
    body = pickedValues;
    req.body = body;
    doc = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    doc = await Appointment.findById(req.params.id);
    if ((doc.status ?? "pending") === "pending") {
      const pickedValues = _.pick(req.body, [
        "appointmentDate",
        "appointmentTime",
        "reasonForVisit",
        "symptoms",
        "diagnosis",
        "prescriptions",
      ]);
      body = pickedValues;
      req.body = body;
      req.body.status = "pending";
      doc.updateOne(req.body, {
        new: true,
        runValidators: true,
      });

      //   const doc =  await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      //     new: true,
      //     runValidators: true
      //   });
    }
  }

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
