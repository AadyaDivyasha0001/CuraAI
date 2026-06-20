import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "../styles/Appointments.css";
import { jsPDF } from "jspdf";
export default function Appointments() {

  const [appointments, setAppointments] =
    useState([]);
    const [showReschedule, setShowReschedule] =
  useState(false);

const [selectedAppointment,
  setSelectedAppointment] =
  useState(null);

const [newDate, setNewDate] =
  useState("");

const [newTime, setNewTime] =
  useState("");
  const [availableSlots,
  setAvailableSlots] =
  useState([]);
   
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/appointments",
        {
          headers: {
            Authorization:
              localStorage.getItem("token"),
          },
        }
      );

      setAppointments(res.data);

    } catch (error) {

      toast.error(
        "Failed to load appointments"
      );

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const cancelAppointment = async (id) => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this appointment?"
      );

    if (!confirmCancel) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/appointments/${id}`,
        {
          headers: {
            Authorization:
              localStorage.getItem("token"),
          },
        }
      );

      setAppointments(
        appointments.filter(
          (appointment) =>
            appointment._id !== id
        )
      );

      toast.success(
  "Appointment Cancelled Successfully ❌",
  {
    position: "top-right",
    autoClose: 3000,
  }
);

    } catch (error) {

      toast.error(
        "Failed to cancel appointment"
      );

      console.log(error);

    }
  };
   const downloadReceipt = (appointment) => {

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("CuraAI Appointment Receipt", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Appointment ID: ${appointment._id}`,
    20,
    40
  );

  doc.text(
    `Doctor: ${appointment.doctorName}`,
    20,
    55
  );

  doc.text(
    `Patient: ${appointment.patientName}`,
    20,
    70
  );

  doc.text(
    `Date: ${appointment.appointmentDate}`,
    20,
    85
  );

  doc.text(
    `Time: ${appointment.appointmentTime}`,
    20,
    100
  );

  doc.text(
    `Symptoms: ${appointment.symptoms}`,
    20,
    115
  );

  doc.text(
    `Status: Confirmed`,
    20,
    130
  );

  doc.text(
    `Generated On: ${new Date().toLocaleString()}`,
    20,
    145
  );

  doc.save(
    `Appointment_${appointment._id}.pdf`
  );
};
const rescheduleAppointment =
  async () => {
    if (!newTime) {

  toast.error(
    "Please select a slot"
  );

  return;
}

    try {
       
      await axios.put(
        `http://localhost:5000/api/appointments/${selectedAppointment._id}`,
        {
          appointmentDate:
            newDate,

          appointmentTime:
            newTime,
        },
        {
          headers: {
            Authorization:
              localStorage.getItem(
                "token"
              ),
          },
        }
      );

      toast.success(
        "Appointment Rescheduled Successfully 📅"
      );

      fetchAppointments();

      setShowReschedule(false);

    } catch (error) {

      toast.error(
        "Failed to Reschedule"
      );

      console.log(error);

    }

  };
  if (loading) {
    return (
      <div className="appointments-page">
        <h1>Loading Appointments...</h1>
      </div>
    );
  }
 const today = new Date();
today.setHours(0,0,0,0);

const upcomingAppointments =
  appointments.filter((a) => {

    const appointmentDate =
      new Date(a.appointmentDate);

    appointmentDate.setHours(
      0,0,0,0
    );

    return appointmentDate >= today;
  });

const pastAppointments =
  appointments.filter((a) => {

    const appointmentDate =
      new Date(a.appointmentDate);

    appointmentDate.setHours(
      0,0,0,0
    );

    return appointmentDate < today;
  });
  return (
    <div className="appointments-page">

      <div className="appointments-header">

        <h1>
          My Appointments
        </h1>

        <p>
          Total Appointments:
          {" "}
          {appointments.length}
        </p>

      </div>

      {appointments.length === 0 ? (

        <div className="empty-state">

          <h2>
            No Appointments Yet
          </h2>

          <p>
            Book an appointment with a doctor to see it here.
          </p>

        </div>

      ) : (
        <>
        <h2 className="history-title">
  Appointment History
</h2>

{pastAppointments.map((a) => (

  <div
    className="appointment-card history-card"
    key={a._id}
  >

    <h3>
      👨‍⚕️ {a.doctorName}
    </h3>

    <p>
      {a.appointmentDate}
    </p>

    <p>
      {a.appointmentTime}
    </p>

    <span className="history-badge">
      Completed
    </span>

  </div>

))}
          <h2>Upcoming Appointments</h2>

        {upcomingAppointments.map((a) => (

          <div
            className="appointment-card"
            key={a._id}
          >

            <div className="appointment-top">

              <h2>
                👨‍⚕️ {a.doctorName}
              </h2>

              <span className="status">
                Confirmed
              </span>

            </div>

            <div className="appointment-details">

              <p>
                <strong>
                  Patient:
                </strong>
                {" "}
                {a.patientName}
              </p>

              <p>
                <strong>
                  Date:
                </strong>
                {" "}
                {a.appointmentDate}
              </p>

              <p>
                <strong>
                  Time:
                </strong>
                {" "}
                {a.appointmentTime}
              </p>

              <p>
                <strong>
                  Symptoms:
                </strong>
                {" "}
                {a.symptoms}
              </p>

            </div>

           <div className="appointment-actions">

 

  <button
  className="download-btn"
  onClick={() =>
    downloadReceipt(a)
  }
>
  Download Receipt
</button>

<button
  className="reschedule-btn"
  onClick={async () => {

    setSelectedAppointment(a);

    setNewDate(
      a.appointmentDate
    );

    try {

      const doctorRes =
        await axios.get(
          `http://localhost:5000/api/doctors/${a.doctorId}`
        );

      setAvailableSlots(
        doctorRes.data.availableSlots || []
      );

    } catch (err) {

      console.log(err);

    }

    setShowReschedule(true);

  }}
>
  Reschedule
</button>

<button
  className="cancel-btn"
  onClick={() =>
    cancelAppointment(a._id)
  }
>
  Cancel Appointment
</button>

  </div>      
</div>
        ))}
</>
      )}

      {showReschedule && (

        <div className="modal-overlay">

          <div className="reschedule-modal">

            <h2>
              Reschedule Appointment
            </h2>

            <input
              type="date"
              value={newDate}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setNewDate(
                  e.target.value
                )
              }
            />

            <h4>
  Available Slots
</h4>

<div className="slot-container">

  {availableSlots
    .filter((slot) => {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      if (newDate !== today)
        return true;

      const now =
        new Date();

      const [time, period] =
        slot.split(" ");

      let [hours, minutes] =
        time.split(":").map(Number);

      if (
        period === "PM" &&
        hours !== 12
      )
        hours += 12;

      if (
        period === "AM" &&
        hours === 12
      )
        hours = 0;

      const slotTime =
        new Date();

      slotTime.setHours(
        hours,
        minutes,
        0,
        0
      );

      return slotTime > now;

    })
    .map((slot) => (

      <button
        key={slot}
        type="button"
        className={
          newTime === slot
            ? "slot-btn active-slot"
            : "slot-btn"
        }
        onClick={() =>
          setNewTime(slot)
        }
      >
        {slot}
      </button>

    ))}

  {availableSlots.filter((slot) => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    if (newDate !== today)
      return true;

    const now =
      new Date();

    const [time, period] =
      slot.split(" ");

    let [hours, minutes] =
      time.split(":").map(Number);

    if (
      period === "PM" &&
      hours !== 12
    )
      hours += 12;

    if (
      period === "AM" &&
      hours === 12
    )
      hours = 0;

    const slotTime =
      new Date();

    slotTime.setHours(
      hours,
      minutes,
      0,
      0
    );

    return slotTime > now;

  }).length === 0 && (

    <p>
      No Available Slots For This Date
    </p>

  )}

</div>

            <div className="modal-buttons">

              <button
                onClick={
                  rescheduleAppointment
                }
              >
                Save Changes
              </button>

              <button
                onClick={() =>
                  setShowReschedule(
                    false
                  )
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}