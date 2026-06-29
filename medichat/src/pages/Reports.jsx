import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaFileMedical,
  FaUpload
} from "react-icons/fa";

import "../styles/Reports.css";

export default function Reports() {

  const [reports] = useState(
    JSON.parse(localStorage.getItem("reports")) || []
  );

  const [reportDoctor, setReportDoctor] = useState("");
  const [reportType, setReportType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    async function loadDoctors() {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/doctors"
        );

        setDoctors(res.data);

      } catch (err) {

        console.log(err);

      }

    }

    loadDoctors();

  }, []);

  const uploadReport = () => {

    if (
      !selectedFile ||
      !reportDoctor ||
      !reportType
    ) {

      alert("Please complete all fields.");
      return;

    }

    const reader = new FileReader();

    reader.onloadend = () => {

      const selectedDoctor = doctors.find(
        doctor => doctor.name === reportDoctor
      );

      const newReport = {

        id: Date.now(),

        doctorId: selectedDoctor?._id,

        doctorName: selectedDoctor?.name,

        type: reportType,

        file: reader.result,

        fileName: selectedFile.name,

        uploadedOn:
          new Date().toLocaleDateString()

      };

      const updated = [
        ...reports,
        newReport
      ];

      localStorage.setItem(
        "reports",
        JSON.stringify(updated)
      );

      window.location.reload();

    };

    reader.readAsDataURL(selectedFile);

  };

  return (

    <div className="reports-page">

      <div className="reports-header">

        <div className="reports-title">

          <div className="reports-icon">
            <FaFileMedical />
          </div>

          <div>

            <h1>My Medical Reports</h1>

            <p>
              Upload and manage your medical reports securely
            </p>

          </div>

        </div>

        

      </div>

      <div className="upload-card">

        <h2>Upload a New Report</h2>

        <div className="upload-form">

          <select
            value={reportDoctor}
            onChange={(e) =>
              setReportDoctor(e.target.value)
            }
          >

            <option value="">
              Select Doctor
            </option>

            {doctors.map((doctor) => (

              <option
                key={doctor._id}
                value={doctor.name}
              >
                {doctor.name}
              </option>

            ))}

          </select>

          <select
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value)
            }
          >

            <option value="">
              Report Type
            </option>

            <option>Blood Test</option>
            <option>Prescription</option>
            <option>MRI</option>
            <option>CT Scan</option>
            <option>X-Ray</option>
            <option>ECG</option>
            <option>Ultrasound</option>
            <option>Other</option>

          </select>

          <label className="file-upload">

    📎 Choose Report

    <input
        type="file"
        hidden
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e)=>
            setSelectedFile(e.target.files[0])
        }
    />

</label>

          <button
            onClick={uploadReport}
          >

            <FaUpload />

            Upload Report

          </button>

        </div>

      </div>

      <div className="reports-list">

        {

          reports.length === 0 ?

            <div className="empty-state">

              <FaFileMedical />

              <h2>
                No Reports Yet
              </h2>

              <p>
                Upload your first medical report.
              </p>

            </div>

            :

            reports.map((report) => (

              <div
                className="report-card"
                key={report.id}
              >

                <div className="report-info">

    <h3>{report.type}</h3>

    <p>👨‍⚕️ {report.doctorName}</p>

    <p>📅 Uploaded on {report.uploadedOn}</p>

    <small
        style={{
            color:"#18b8dd",
            fontWeight:"600"
        }}
    >
        Secure Medical Document
    </small>

</div>

      <div className="report-buttons">

    

    <a
        className="download-btn"
        href={report.file}
        download={report.fileName}
    >
        ⬇ Download
    </a>

    <button
        className="delete-btn"
        onClick={() => {

            const updated =
                reports.filter(
                    r => r.id !== report.id
                );

            localStorage.setItem(
                "reports",
                JSON.stringify(updated)
            );

            window.location.reload();

        }}
    >
        🗑 Delete
    </button>

</div>

              </div>

            ))

        }

      </div>

    </div>

  );

}