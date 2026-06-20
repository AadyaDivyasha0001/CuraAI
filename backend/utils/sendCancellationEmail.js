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

const sendCancellationEmail =
async (appointment) => {

  await transporter.sendMail({

    from:
      process.env.EMAIL_USER,

    to:
      "divyashaaadya@gmail.com",

    subject:
      "CuraAI Appointment Cancelled ❌",

    html: `

      <h2>
        Appointment Cancelled
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

      <hr>

      <p>
        Your appointment has been cancelled.
      </p>

    `,

  });

};

module.exports =
sendCancellationEmail;