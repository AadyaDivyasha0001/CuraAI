import { useEffect, useState } from "react";
import "../styles/Profile.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Profile() {

 const [user, setUser] = useState(null);

const [appointments, setAppointments] =
useState([]);

const [loading,setLoading]=
useState(true);
const [profileImage, setProfileImage] = useState(
  localStorage.getItem("profileImage") || ""
);
const [reports, setReports] = useState(
  JSON.parse(localStorage.getItem("reports")) || []
);
const [editing, setEditing] = useState(false);

const [profileData, setProfileData] = useState({
  name: "",
  email: "",
  mobile: "",
  gender: "",
  bloodGroup: "",
  age: "",
  height: "",
  weight: "",
  address: ""
});
const saveProfile = () => {

  localStorage.setItem(
    "user",
    JSON.stringify(profileData)
  );

  setUser(profileData);

  setEditing(false);

  alert("Profile Updated Successfully");

};

const [reportDoctor, setReportDoctor] = useState("");

const [reportType, setReportType] = useState("");

const [selectedFile, setSelectedFile] = useState(null);
const [doctors, setDoctors] = useState([]);

 useEffect(() => {

    async function loadProfile(){

       const storedUser = JSON.parse(
  localStorage.getItem("user") || "{}"
);

        setUser(storedUser);
        setProfileData({
  name: storedUser.name || "",
  email: storedUser.email || "",
  mobile: storedUser.mobile || "",
  gender: storedUser.gender || "",
  bloodGroup: storedUser.bloodGroup || "",
  age: storedUser.age || "",
  height: storedUser.height || "",
  weight: storedUser.weight || "",
  address: storedUser.address || ""
});

        try{

            const res =
            await axios.get(
                "http://localhost:5000/api/appointments",
                {
                    headers:{
                        Authorization:
                        localStorage.getItem("token")
                    }
                }
            );

           setAppointments(res.data);

const doctorRes = await axios.get(
  "http://localhost:5000/api/doctors"
);

setDoctors(doctorRes.data);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    }

    loadProfile();

},[]);
const today = new Date();

today.setHours(0,0,0,0);

const upcomingAppointments =
appointments.filter(a=>{

    const d =
    new Date(a.appointmentDate);

    d.setHours(0,0,0,0);

    return d>=today;

});

const completedAppointments =
appointments.filter(a=>{

    const d =
    new Date(a.appointmentDate);

    d.setHours(0,0,0,0);

    return d<today;

});



const doctorsConsulted =
new Set(

appointments.map(a=>a.doctorId)

).size;
if (loading || !user) {
  return (
    <div className="profile-page">
      <h2>Loading Profile...</h2>
    </div>
  );
}
const handleImageUpload = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {

    setProfileImage(reader.result);

    localStorage.setItem(
      "profileImage",
      reader.result
    );

  };

  reader.readAsDataURL(file);

};

const removeImage = () => {

  setProfileImage("");

  localStorage.removeItem("profileImage");

};
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

    const updatedReports = [
      ...reports,
      newReport
    ];

    setReports(updatedReports);

    localStorage.setItem(
      "reports",
      JSON.stringify(updatedReports)
    );

    setReportDoctor("");
    setReportType("");
    setSelectedFile(null);

  };

  reader.readAsDataURL(selectedFile);

};
const deleteReport = (id) => {

  const updated = reports.filter(
    report => report.id !== id
  );

  setReports(updated);

  localStorage.setItem(
    "reports",
    JSON.stringify(updated)
  );

};
console.log(doctors);
  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar-large">

{profileImage ? (

<img
src={profileImage}
alt="Profile"
/>

) : (

user?.name?.charAt(0)?.toUpperCase()

)}

</div>

          <div>

            <h2>{user.name}</h2>

            <p>{user.email}</p>

            <span className="verified">
              ✔ Verified Patient
            </span>

          </div>

        </div>

        <div className="profile-buttons">

<label className="upload-photo-btn">

Upload Photo

<input
type="file"
accept="image/*"
hidden
onChange={handleImageUpload}
/>

</label>

<button
className="remove-photo-btn"
onClick={removeImage}
>

Remove Photo

</button>

</div>

      </div>

      <div className="profile-stats">

        <div className="stat-card">
          <h2>{upcomingAppointments.length}</h2>
          <p>Appointments</p>
        </div>

        <div className="stat-card">
          <h2>{completedAppointments.length}</h2>
          <p>Reports</p>
        </div>

        <div className="stat-card">
          <h2>{doctorsConsulted}</h2>
          <p>Doctors</p>
        </div>

      </div>
      <div className="next-appointment">

<h2>
Upcoming Appointment
</h2>

{
upcomingAppointments.length>0 ?

<div className="next-card">

<h3>

👨‍⚕️

{
upcomingAppointments[0].doctorName
}

</h3>

<p>

📅

{
upcomingAppointments[0].appointmentDate
}

</p>

<p>

🕒

{
upcomingAppointments[0].appointmentTime
}

</p>

</div>

:

<p>

No Upcoming Appointments

</p>

}

</div>

      <div className="personal-info">

     <div className="section-header">

<h2>Personal Information</h2>

{editing ? (

<button
className="save-btn"
onClick={saveProfile}
>

Save Changes

</button>

) : (

<button
className="edit-btn"
onClick={()=>setEditing(true)}
>

✏ Edit Profile

</button>

)}

</div>

        <div className="info-grid">

          <div>
            <input
value={profileData.name}
disabled={!editing}
onChange={(e)=>
setProfileData({
...profileData,
name:e.target.value
})
}
/>
          </div>

          <div>
            <label>Email</label>
            <input
              value={user.email}
              readOnly
            />
          </div>

          <div>
            <label>Phone</label>

<input

value={profileData.mobile}

disabled={!editing}

onChange={(e)=>

setProfileData({

...profileData,

mobile:e.target.value

})

}

/>
<div className="input-group">
    <label>Gender</label>

    <select
        className="profile-select"
        disabled={!editing}
        value={profileData.gender}
        onChange={(e)=>
            setProfileData({
                ...profileData,
                gender:e.target.value
            })
        }
    >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
    </select>
</div>

<div className="input-group">
    <label>Blood Group</label>

    <select
        className="profile-select"
        disabled={!editing}
        value={profileData.bloodGroup}
        onChange={(e)=>
            setProfileData({
                ...profileData,
                bloodGroup:e.target.value
            })
        }
    >
        <option value="">Select Blood Group</option>
        <option>A+</option>
        <option>A-</option>
        <option>B+</option>
        <option>B-</option>
        <option>AB+</option>
        <option>AB-</option>
        <option>O+</option>
        <option>O-</option>
    </select>
</div>
          </div>

          

        </div>
         <div className="reports-section">
        <h2>My Medical Reports</h2>

<div className="upload-report-card">

<select
value={reportDoctor}
onChange={(e)=>
setReportDoctor(e.target.value)}
>

<option value="">
Select Doctor
</option>

{doctors.map((doctor)=>(

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
onChange={(e)=>
setReportType(e.target.value)}
>

<option value="">
Report Type
</option>

<option>
Blood Test
</option>

<option>
Prescription
</option>

<option>
MRI
</option>

<option>
CT Scan
</option>

<option>
X-Ray
</option>

<option>
Other
</option>

</select>

<input
type="file"
accept=".pdf,.jpg,.jpeg,.png"
onChange={(e)=>
setSelectedFile(
e.target.files[0]
)}
/>

<button
onClick={uploadReport}
>

Upload Report

</button>

</div>

<div className="reports-list">

{

reports.length===0 ?

<p>No reports uploaded yet.</p>

:

reports.map(report=>(

<div
className="report-card"
key={report.id}
>

<div>

<h3>

📄 {report.type}

</h3>

<p>

👨‍⚕️ {report.doctorName}

</p>

<p>

📅 {report.uploadedOn}

</p>

</div>

<div className="report-actions">

<a
href={report.file}
download={report.fileName}
>

Download

</a>

<button
onClick={()=>
deleteReport(report.id)
}
>

Delete

</button>

</div>

</div>

))

}

</div>

</div>

      </div>

    </div>

  );

}