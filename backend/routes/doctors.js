const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});
router.get("/:id", async (req, res) => {
  try {
    const doctor =
      await Doctor.findById(
        req.params.id
      );

    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
router.put("/:id/slot", async (req,res)=>{

 try {

   const doctor =
   await Doctor.findById(
     req.params.id
   );

   doctor.availableSlots =
   doctor.availableSlots.filter(
     slot => slot !== req.body.slot
   );

   await doctor.save();

   res.json({
     success:true
   });

 } catch(error){

   res.status(500).json({
     error:error.message
   });

 }

});
router.post(
  "/by-city",
  async (req, res) => {
    try {

      const {
        city,
        specialization,
      } = req.body;

      let doctors = await Doctor.find({
        location: {
          $regex: new RegExp(city, "i"),
        },
        $or: [
          { specialization },
          { speciality: specialization },
        ],
      });

      let fallback = false;
      let fallbackMessage = "";

      // Specialist found in city
      if (doctors.length > 0) {
        return res.json({
          doctors,
          fallback,
          fallbackMessage,
        });
      }

      // Show General Physician in same city
      doctors = await Doctor.find({
        location: {
          $regex: new RegExp(city, "i"),
        },
        $or: [
          { speciality: "General Physician" },
          { specialization: "General Physician" },
        ],
      });

      if (doctors.length > 0) {

        fallback = true;

        fallbackMessage =
          `No ${specialization} found in ${city}.\n\nShowing nearby General Physicians.`;

        return res.json({
          doctors,
          fallback,
          fallbackMessage,
        });
      }

      // Show any General Physician
      doctors = await Doctor.find({
        $or: [
          { speciality: "General Physician" },
          { specialization: "General Physician" },
        ],
      }).limit(5);

      fallback = true;

      fallbackMessage =
        `No ${specialization} found in ${city}.\n\nShowing available General Physicians.`;

      return res.json({
        doctors,
        fallback,
        fallbackMessage,
      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });

    }
  }
);

module.exports = router;