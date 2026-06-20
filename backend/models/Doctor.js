const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name:String,
  specialization:String,
  experience:Number,
  rating:Number,
  fee:Number,

  hospital:String,
  location:String,

  clinicAddress:String,
  sittingHours: {
  start: String,
  end: String,
},
  rushHours: [String],
  clinicName: String,
  about:String,
   clinicPhone: String,
  available:Boolean,

  availableSlots:[String],


});

module.exports =
mongoose.model("Doctor", DoctorSchema);