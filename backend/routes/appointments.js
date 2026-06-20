const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth =
require("../middleware/auth");
// Create Appointment
router.post("/", auth, async (req, res) => {
  try {
    const appointment =
     await Appointment.create({
  ...req.body,
  userId: req.user.id
});

    res.status(201).json(appointment);
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
      await Appointment.find();

    res.json(appointments);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Delete Appointment
router.delete("/:id",auth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Appointment Cancelled",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;