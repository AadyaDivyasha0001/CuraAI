import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/doctors.css";

export default function TopRatedDoctors() {

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {

    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();

  }, []);

  return (
    <section className="top-doctors">

      <div className="heading-row">
       <div className="specialists-header">

  <h2 className="section-title">
    Top-rated specialists
  </h2>

  <button
    className="view-more-btn"
    onClick={() =>
      navigate("/find-doctor")
    }
  >
    View More →
  </button>

</div>
        
      </div>

      <div className="doctor-grid">

        {doctors.slice(0,10).map((doctor,index) => (

          <div
            className="doctor-card"
            key={doctor._id}
          >

            <div className="doctor-top">

              <div
                className="doctor-avatar"
                style={{
                  background:[
                    "#0EA5E9",
                    "#14B8A6",
                    "#8B5CF6",
                    "#F97316"
                  ][index % 4]
                }}
              >
                {doctor.name
                  .replace("Dr.","")
                  .trim()
                  .split(" ")
                  .map(word => word[0])
                  .join("")
                  .substring(0,2)}
              </div>

              <div>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
              </div>

            </div>

            <div className="doctor-info">
              ⭐ {doctor.rating}
              <br />
              {doctor.experience} years
              <br />
              {doctor.location}
            </div>

            <div className="doctor-buttons">

              <button
                onClick={() =>
                  navigate(`/doctor/${doctor._id}`)
                }
              >
                View Profile
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}