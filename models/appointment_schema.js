const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  
    patientId: {
         type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
        required: true 
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    reasonForVisit: {
        type: String,
        required: true
    },
    status: { type: String,default: "pending",
        enum: ['pending', 'cancelled', 'approved']},
    symptoms: [String],
    diagnosis: [String],
    prescriptions: [String]
},
{
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);