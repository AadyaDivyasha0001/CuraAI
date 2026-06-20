const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

  service: "gmail",

  auth: {

    user:
      process.env.EMAIL_USER,

    pass:
      process.env.EMAIL_PASS,

  },

});

const sendAppointmentEmail =
async (appointment) => {
 
 console.log(
    "Sending email to:",
    appointment.email
  );

  await transporter.sendMail({

    from:
      process.env.EMAIL_USER,

    to:
      "divyashaaadya@gmail.com",

    subject:
      "CuraAI Appointment Confirmation",

    html: `

      <h2>
        Appointment Confirmed ✅
      </h2>

      <p>
        <strong>Patient:</strong>
        ${appointment.patientName}
      </p>

      <p>
        <strong>Doctor:</strong>
        ${appointment.doctorName}
      </p>

      <p>
        <strong>Date:</strong>
        ${appointment.appointmentDate}
      </p>

      <p>
        <strong>Time:</strong>
        ${appointment.appointmentTime}
      </p>

      <p>
        <strong>Symptoms:</strong>
        ${appointment.symptoms}
      </p>

      <hr>

      <p>
        Thank you for choosing CuraAI.
      </p>

    `,

  });

};

module.exports =
sendAppointmentEmail;