const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth =
require("../middleware/auth");
const sendAppointmentEmail =
require("../utils/sendAppointmentEmail");
const sendCancellationEmail =
require("../utils/sendCancellationEmail");

const sendRescheduleEmail =
require("../utils/sendRescheduleEmail");
// Create Appointment
router.post("/", auth, async (req, res) => {

  try {

    // Check if doctor is already booked

    const existingAppointment =
      await Appointment.findOne({

        doctorId: req.body.doctorId,

        appointmentDate:
          req.body.appointmentDate,

        appointmentTime:
          req.body.appointmentTime,

      });

    if (existingAppointment) {

      return res.status(400).json({
        message: "Slot already booked",
      });

    }

    // Check if patient already has an appointment
    // at the same date and time

    const patientAppointment =
      await Appointment.findOne({

        userId: req.user.id,

        appointmentDate:
          req.body.appointmentDate,

        appointmentTime:
          req.body.appointmentTime,

      });

    if (patientAppointment) {

      return res.status(400).json({

        message:
          "You already have another appointment at this time."

      });

    }

    // Create appointment

    const appointment =
      await Appointment.create({

        ...req.body,

        userId: req.user.id,

      });

    const Doctor =
      require("../models/Doctor");

    const doctor =
      await Doctor.findById(
        req.body.doctorId
      );

    if (doctor) {

      doctor.availableSlots =
        doctor.availableSlots.filter(

          slot =>
            slot !==
            req.body.appointmentTime

        );

      await doctor.save();

    }

    try {

      await sendAppointmentEmail(
        appointment
      );

    } catch (mailError) {

      console.log(
        "Email Error:",
        mailError.message
      );

    }

    res.status(201).json(
      appointment
    );

  } catch (err) {

    res.status(500).json({

      error: err.message,

    });

  }

});


// Get All Appointments
router.get("/", auth, async (req, res) => {
  try {
   const appointments =
await Appointment.find({
  userId: req.user.id
});
    res.json(appointments);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Delete Appointment
const Doctor =
require("../models/Doctor");
router.delete("/:id", auth, async (req, res) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {

      return res.status(404).json({
        message:
          "Appointment not found",
      });

    }

    try {

      await sendCancellationEmail(
        appointment
      );

    } catch (mailError) {

      console.log(
        "Cancellation Email Error:",
        mailError.message
      );

    }

    const doctor =
      await Doctor.findById(
        appointment.doctorId
      );

    if (doctor) {

      if (
        !doctor.availableSlots.includes(
          appointment.appointmentTime
        )
      ) {

        doctor.availableSlots.push(
          appointment.appointmentTime
        );

        doctor.availableSlots.sort();

        await doctor.save();

      }

    }

    await Appointment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Appointment Cancelled",
    });

  } catch (err) {

    res.status(500).json({
      error:
        err.message,
    });

  }

});

router.put("/:id", auth, async (req, res) => {

  try {

    const currentAppointment =
      await Appointment.findById(
        req.params.id
      );

    if (!currentAppointment) {

      return res.status(404).json({
        message:
          "Appointment not found",
      });

    }

    const existingAppointment =
      await Appointment.findOne({

        doctorId:
          currentAppointment.doctorId,

        appointmentDate:
          req.body.appointmentDate,

        appointmentTime:
          req.body.appointmentTime,

        


      });
       const patientAppointment =
await Appointment.findOne({

  userId: req.user.id,

  appointmentDate:
    req.body.appointmentDate,

  appointmentTime:
    req.body.appointmentTime,
      _id:{
    $ne:req.params.id
      }
});


    if (existingAppointment) {

      return res.status(400).json({

        message:
          "Slot already booked",

      });

    }
    if(patientAppointment){

  return res.status(400).json({

    message:
      "Appointment conflict detected. You already have a booking at this time."

  });

}
   

    const appointment =
      await Appointment.findByIdAndUpdate(

        req.params.id,

        {
          appointmentDate:
            req.body.appointmentDate,

          appointmentTime:
            req.body.appointmentTime,
        },

        {
          new: true,
        }

      );

    try {

      await sendRescheduleEmail(
        appointment
      );

    } catch (mailError) {

      console.log(
        "Reschedule Email Error:",
        mailError.message
      );

    }

    res.json(appointment);

  } catch (error) {

    res.status(500).json({
      error:
        error.message,
    });

  }

});
module.exports = router;