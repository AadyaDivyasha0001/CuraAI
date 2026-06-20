import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "../styles/Appointments.css";

export default function Appointments() {

  const [appointments, setAppointments] =
    useState([]);
    const [selectedSlot, setSelectedSlot] =
  useState("");
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

  if (loading) {
    return (
      <div className="appointments-page">
        <h1>Loading Appointments...</h1>
      </div>
    );
  }

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

        appointments.map((a) => (

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

            <button
              className="cancel-btn"
              onClick={() =>
                cancelAppointment(
                  a._id
                )
              }
            >
              Cancel Appointment
            </button>

          </div>

        ))

      )}

    </div>
  );
}