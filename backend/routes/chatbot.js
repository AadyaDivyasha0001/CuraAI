const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const { symptom } = req.body;

    const n8nResponse = await axios.post(
      "http://localhost:5678/webhook-test/curaai-symptom",
      {
        symptom,
      }
    );

    const analysis =
      n8nResponse.data.analysis || {};
      const messageType =
  analysis.messageType;
      console.log("ANALYSIS:");
console.log(analysis);

console.log("DEPARTMENT:");
console.log(analysis.department);

   const department =
  analysis.department ||
  "General Physician";

const doctors =
  n8nResponse.data.doctors || [];
  if (
  messageType === "General"
) {
  return res.json({
    type: "general",
    response:
      "👨‍⚕️ I am CuraAI. I can help analyze symptoms, recommend specialists, find doctors, and book appointments. Please describe your symptoms."
  });
}
if (
  messageType === "Location"
) {
  return res.json({
    type: "location",
    city: req.body.symptom
  });
}


    res.json({
        type:"symptom",
      response: `
Possible Condition:
${analysis.condition}

Recommended Specialist:
${analysis.department}

Advice:
${analysis.advice}
`,

      specialization:
        analysis.department,

      doctors,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }
});

module.exports = router;