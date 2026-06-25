import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "../styles/DoctorProfile.css";

export default function DoctorProfile() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
   
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!doctor) {
    return (
      <div className="loading-container">
        <h2>Loading Doctor...</h2>
      </div>
    );
  }

  return (
    <div className="doctor-profile-page">
     <div className="profile-card">

  <div className="profile-header">

    <div className="profile-avatar">
      {doctor.name
        .replace("Dr.", "")
        .trim()
        .split(" ")
        .map((w) => w[0])
        .join("")
        .substring(0, 2)}
    </div>

    <div className="profile-info">

      <h1>{doctor.name}</h1>

      <h3>{doctor.specialization}</h3>

      <div className="profile-badges">

        <span>
          ⭐ {doctor.rating}
        </span>

        <span>
          🩺 {doctor.experience} Years
        </span>

        <span>
          📍 {doctor.location}
        </span>

      </div>

    </div>

  </div>
  <div className="doctor-details-grid">

  <div className="detail-card">
    <span>🏥</span>
    <h4>Hospital</h4>
    <p>{doctor.hospital}</p>
  </div>

  <div className="detail-card">
    <span>📍</span>
    <h4>Location</h4>
    <p>{doctor.location}</p>
  </div>

  <div className="detail-card">
    <span>🏢</span>
    <h4>Clinic</h4>
    <p>{doctor.clinicAddress}</p>
  </div>

  <div className="detail-card">
    <span>⏰</span>
    <h4>Sitting Hours</h4>
    <p>
      {doctor.sittingHours?.start}
      {" - "}
      {doctor.sittingHours?.end}
    </p>
  </div>

  <div className="detail-card">
    <span>🔥</span>
    <h4>Rush Hours</h4>
    <p>{doctor.rushHours?.join(", ")}</p>
  </div>

  <div className="detail-card">
    <span>🏥</span>
    <h4>Clinic Name</h4>
    <p>{doctor.clinicName}</p>
  </div>

  <div className="detail-card">
    <span>📞</span>
    <h4>Clinic Phone</h4>
    <p>{doctor.clinicPhone}</p>
  </div>

  <div className="detail-card">
    <span>💰</span>
    <h4>Consultation Fee</h4>
    <p>₹{doctor.fees}</p>
  </div>

</div>

<div className="doctor-about">
  <p>{doctor.about}</p>
</div>
</div>
<div className="book-btn-wrapper">
<button
  className="book-btn"
  onClick={() => setShowForm(!showForm)}
>
  {showForm ? "Close Form" : "Book Appointment"}
</button>

</div>

  

      {showForm && (
        <AppointmentForm
          doctor={doctor}
          closeForm={() =>
            setShowForm(false)
          }
        />
      )}

    </div>
  );
}

function AppointmentForm({
  doctor,
  closeForm,
}) {
    const [selectedSlot, setSelectedSlot] =
  useState("");
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
  });
  const currentTime = new Date();

const availableSlotsToday =
  doctor.availableSlots?.filter(
    (slot) => {

      if (
        form.appointmentDate !==
        new Date()
          .toISOString()
          .split("T")[0]
      ) {
        return true;
      }

      const today =
        new Date();

      const [time, period] =
        slot.split(" ");

      let [hours, minutes] =
        time.split(":");

      hours = parseInt(hours);

      if (
        period === "PM" &&
        hours !== 12
      ) {
        hours += 12;
      }

      if (
        period === "AM" &&
        hours === 12
      ) {
        hours = 0;
      }

      const slotDate =
        new Date(today);

      slotDate.setHours(
        hours,
        parseInt(minutes),
        0,
        0
      );

      return slotDate > currentTime;
    }
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    // Save appointment
    await axios.post(
      "http://localhost:5000/api/appointments",
      {
        ...form,
        doctorId: doctor._id,
        doctorName: doctor.name,
      },
      {
        headers: {
          Authorization:
            localStorage.getItem("token"),
        },
      }
    );

    // Remove booked slot from doctor
    await axios.put(
      `http://localhost:5000/api/doctors/${doctor._id}/slot`,
      {
        slot: form.appointmentTime,
      }
    );

    toast.success(
  `Appointment booked with ${doctor.name}`,
  {
    position: "top-right",
    autoClose: 3000,
  }
);

    setForm({
      patientName: "",
      age: "",
      gender: "",
      mobile: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      symptoms: "",
    });

    closeForm();

  } catch (error) {

    console.log(error);

     toast.error(
    error.response?.data?.message ||
    "Failed to book appointment"
  );

  }
};

  return (

    <div className="appointment-form">

      <h2>
        Book Appointment with
        <span> {doctor.name}</span>
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

       <input
  type="date"
  name="appointmentDate"
  value={form.appointmentDate}
  onChange={handleChange}
  min={
    new Date()
      .toISOString()
      .split("T")[0]
  }
  required
/>

        

        <textarea
          name="symptoms"
          placeholder="Describe your symptoms..."
          value={form.symptoms}
          onChange={handleChange}
          rows="4"
          required
        />
           <div className="slots-preview">

  <h4>Available Today</h4>

  <div className="slot-list">

  {availableSlotsToday &&
  availableSlotsToday.length > 0 ? (

    availableSlotsToday.map(
      (slot,index) => (

        <label
          key={index}
          className={`slot-chip ${
            selectedSlot === slot
              ? "selected-slot"
              : ""
          }`}
        >

          <input
            type="radio"
            name="appointmentTime"
            value={slot}
            checked={
              selectedSlot === slot
            }
            onChange={() => {

              setSelectedSlot(slot);

              setForm({
                ...form,
                appointmentTime:
                  slot,
              });

            }}
          />

          {slot}

        </label>

      )
    )

  ) : (

    <p
      style={{
        color: "#888",
        fontWeight: "500",
      }}
    >
    {form.appointmentDate ===
  new Date()
    .toISOString()
    .split("T")[0]
    ? "No slots available today"
    : "No slots available for selected date"}
</p>

  )}

</div>

</div>
        <button
          type="submit"
          className="confirm-btn"
        >
          Confirm Booking
        </button>

      </form>

    </div>
  );
}