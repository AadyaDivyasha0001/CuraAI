import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/findDoctor.css";

export default function FindDoctor() {

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));

  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    doctor.specialization
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    doctor.location
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    doctor.hospital
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="find-doctor-page">

      <div className="doctor-page-header">

        <h1>
          Find Your Specialist
        </h1>

        <p>
          Browse experienced doctors and
          book appointments instantly.
        </p>

        <input
          type="text"
          placeholder="Search by doctor name, specialty, hospital..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="doctor-search"
        />

      </div>

      <div className="doctor-grid">

        {filteredDoctors.length > 0 ? (

          filteredDoctors.map((doctor, index) => (

            <div
              className="doctor-card"
              key={doctor._id}
            >

              <div className="doctor-top">

                <div
                  className="doctor-avatar"
                  style={{
                    background: [
                      "#0EA5E9",
                      "#14B8A6",
                      "#8B5CF6",
                      "#F97316",
                    ][index % 4],
                  }}
                >
                  {doctor.name
                    .replace("Dr.", "")
                    .trim()
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)}
                </div>

                <div>

                  <h3>
                    {doctor.name}
                  </h3>

                  <p>
                    {doctor.specialization}
                  </p>

                </div>

              </div>

              <div className="doctor-info">

                <p>
                  ⭐ {doctor.rating}
                </p>

                <p>
                  {doctor.experience} Years Experience
                </p>

                {doctor.location && (
                  <p>
                    📍 {doctor.location}
                  </p>
                )}

              </div>

              <button
                className="view-profile-btn"
                onClick={() =>
                  navigate(`/doctor/${doctor._id}`)
                }
              >
                View Profile
              </button>

            </div>

          ))

        ) : (

          <div className="no-doctor-found">

            <h2>
              No doctors found 😔
            </h2>

            <p>
              Try another speciality or doctor name.
            </p>

          </div>

        )}

      </div>

    </div>

  );
}