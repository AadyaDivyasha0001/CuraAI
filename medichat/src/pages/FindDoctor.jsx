import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/findDoctor.css";

export default function FindDoctor() {
   const [speciality, setSpeciality] =
  useState("");
  const [location, setLocation] =
  useState("");
  const [experience, setExperience] =
  useState("");
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
   const [showSpeciality, setShowSpeciality] =
  useState(false);
  const [showLocation, setShowLocation] =
  useState(false);

const [showExperience, setShowExperience] =
  useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));

  }, []);

   const filteredDoctors =
  doctors.filter((doctor) => {

    const matchesSearch =

      doctor.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      doctor.speciality
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      doctor.location
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||

      doctor.hospital
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesSpeciality =
      !speciality ||
      doctor.speciality ===
      speciality;

    const matchesLocation =
      !location ||
      doctor.location ===
      location;

    const matchesExperience =
      !experience ||
      doctor.experience >=
      Number(experience);

    return (
      matchesSearch &&
      matchesSpeciality &&
      matchesLocation &&
      matchesExperience
    );

  });
  console.log("Selected:", speciality);

console.log(
  doctors.map(d => d.speciality)
);
  return (

    <div className="find-doctor-page">

      <div className="doctor-page-header">

        <h1>
          Find Your Specialist
        </h1>

        <p>
          Browse experienced doctors and book appointments instantly.
        </p>

       <div className="search-filter-container">

  <input
    type="text"
    placeholder="🔍 Search by doctor name, specialty, hospital..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="doctor-search"
  />

  <div className="custom-dropdown">

  <button
    className="dropdown-btn"
    onClick={() =>
      setShowSpeciality(
        !showSpeciality
      )
    }
  >
    {speciality ||
      "All Specialities"}

       <span className="dropdown-arrow">
    ▼
  </span>
  </button>

  {showSpeciality && (

    <div className="dropdown-menu">

      <div
        className="dropdown-item"
        onClick={() => {
          setSpeciality("");
          setShowSpeciality(false);
        }}
      >
        All Specialities
        
      </div>

      {[...new Set(
        doctors.map(
          d => d.speciality
        )
      )].map((spec) => (

        <div
          key={spec}
          className="dropdown-item"
          onClick={() => {

            setSpeciality(spec);

            setShowSpeciality(
              false
            );

          }}
        >
          {spec}
        </div>

      ))}

    </div>

  )}

</div>
<div className="custom-dropdown">

  <button
    className="dropdown-btn"
    onClick={() =>
      setShowLocation(
        !showLocation
      )
    }
  >
    {location ||
      "All Locations"} 
       <span className="dropdown-arrow">
    ▼
  </span>
  </button>

  {showLocation && (

    <div className="dropdown-menu">

      <div
        className="dropdown-item"
        onClick={() => {
          setLocation("");
          setShowLocation(false);
        }}
      >
        All Locations
      </div>

      {[...new Set(
        doctors.map(
          d => d.location
        )
      )].map((loc) => (

        <div
          key={loc}
          className="dropdown-item"
          onClick={() => {

            setLocation(loc);

            setShowLocation(
              false
            );

          }}
        >
          {loc}
        </div>

      ))}

    </div>

  )}

</div>
 <div className="custom-dropdown">

  <button
    className="dropdown-btn"
    onClick={() =>
      setShowExperience(
        !showExperience
      )
    }
  >
    {experience
      ? `${experience}+ Years`
      : "All Experience"} 
       <span className="dropdown-arrow">
    ▼
  </span>
  </button>

  {showExperience && (

    <div className="dropdown-menu">

      <div
        className="dropdown-item"
        onClick={() => {
          setExperience("");
          setShowExperience(false);
        }}
      >
        All Experience
      </div>

      {[5,6,10,15,20].map((exp) => (

        <div
          key={exp}
          className="dropdown-item"
          onClick={() => {

            setExperience(
              String(exp)
            );

            setShowExperience(
              false
            );

          }}
        >
          {exp}+ Years
        </div>

      ))}

    </div>

  )}

</div>

 
  

</div>

      </div>

      {filteredDoctors.length > 0 && (
        <div className="doctor-table-header">

  <span>Doctor</span>

  <span>Rating</span>

  <span>Experience</span>

  <span>Location</span>

  <span>Consultation Fee</span>

 

</div>
      )}
      <div className="doctor-list">

        {filteredDoctors.length > 0 ? (

          filteredDoctors.map((doctor, index) => (

            <div
              className="doctor-row"
              key={doctor._id}
            >

              <div className="doctor-main">

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

                  <p className="doctor-speciality">
                    {doctor.specialization}
                  </p>

                  <p className="doctor-hospital">
                    🏥 {doctor.hospital}
                  </p>

                </div>

              </div>

              <div className="doctor-rating">

                <span className="rating-score">
                  ⭐ {doctor.rating}
                </span>

                <small>
                  (rating)             
                  </small>

              </div>

              <div className="doctor-experience">

                <span>
                   {doctor.experience} Years
                </span>

                <small>
                  Experience
                </small>

              </div>

              <div className="doctor-location">

                📍 {doctor.location}
                 


              </div>


              <div className="doctor-fees">

                ₹{doctor.fees}

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

      {filteredDoctors.length > 0 && (

        <div className="pagination-footer">

          <p>
            Showing {filteredDoctors.length} doctors
          </p>

        </div>

      )}

    </div>

  );
}
