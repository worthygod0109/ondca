import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

function EditPlayer() {
const serverUrl = "https://ndca.onrender.com";
const { id } = useParams();
const navigate = useNavigate();
const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
const [player, setPlayer] = useState({
adha_num: "",
pfnmae: "",
pmname: "",
plnmae: "",
gender: "",
bloodGroup: "",
email: "",
mobile: "",
permanentAddress: "",
correspondenceAddress: "",
dobCertNo: "",
dobCertDate: "",
dobCertPlace: "",
schoolCertNo: "",
sscCertDate: "",
fatherName: "",
motherName: "",
guardianName: "",
relationType: "",
guardianAddress: "",
emergencyContact: "",
dob: "",
age: "",
// club1: '',
// club2: '',
playerType: "",
battingStyle: "",
bowlingStyle: "",
battingPosition: "",
lastAssociation: "",
lastYear: "",
adharupload: "",
Birth_certificate: "",
ssc_certificate: "",
school_lcertificate: "",
passport: "",

});
useEffect(() => {
// Redirect to login page if not logged in
const id = localStorage.getItem("id");
if (!id) {
navigate("/"); // If not logged in, redirect to Admin login page
}
}, [navigate]);
useEffect(() => {
const fetchPlayerData = async () => {
try {
const response = await axios.get(`${serverUrl}/api-player/${id}`);
const data = response.data;
const formattedDobCertDate = data.player_dob_cer_date
? new Date(data.player_dob_cer_date).toISOString().split("T")[0]
: "";
const formattedSscCertDate = data.player_ssc_cer_date
? new Date(data.player_ssc_cer_date).toISOString().split("T")[0]
: "";
const formattedDob = data.player_dob
? new Date(data.player_dob).toISOString().split("T")[0]
: ""; // Formatting DOB
setPlayer({
adha_num: data.player_aadhar_no || "",
pfnmae: data.player_fname || "",
pmname: data.player_mname || "",
plnmae: data.player_lname || "",
gender: data.player_gender || "",
bloodGroup: data.player_blood_group || "",
email: data.player_email || "",
mobile: data.player_mobile || "",
permanentAddress: data.player_per_addr || "",
correspondenceAddress: data.player_cor_addr || "",
dobCertNo: data.player_dob_cer_no || "",
dobCertDate: formattedDobCertDate,
dobCertPlace: data.player_dob_cer_place || "",
schoolCertNo: data.player_sch_cer_no || "",
sscCertDate: formattedSscCertDate,
fatherName: data.player_father_name || "",
motherName: data.player_mother_name || "",
guardianName: data.player_guard_name || "",
relationType: data.player_relation || "",
guardianAddress: data.player_guard_addr || "",
emergencyContact: data.player_emerg_no || "",
dob: formattedDob,
age: data.player_age,
// club1: data.club1 || '',
// club2: data.club2 || '',
playerType: data.playerType || "",
battingStyle: data.battingStyle || "",
bowlingStyle: data.bowlingStyle || "",
battingPosition: data.battingPosition || "",
lastAssociation: data.lastAssociation || "",
lastYear: data.lastYear || "",
});
} catch (error) {
console.error("Error fetching player data:", error);
// Optionally set an error state to display an error message
}
};

fetchPlayerData();
}, [id]);

const handleChange = (e) => {
const { name, value } = e.target;
if (name === 'dob') {
const age = calculateAge(value);
setPlayer((prevState) => ({
...prevState,
dob: value,
age: age
}));
} else {
// For other input fields
setPlayer((prevState) => ({
...prevState,
[name]: value
}));
}

setPlayer((prevPlayer) => ({
...prevPlayer,
[name]: value,
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
const updatedPlayer = { ...player, status: "pending" };
try {
const response = await axios.put(
`${serverUrl}/update-player/${id}`,
updatedPlayer
);
alert(response.data.message);
navigate("/List_Player"); // Navigate to the list of players after successful update
} catch (error) {
console.error("Error updating player:", error);
// Optionally set an error state to display an error message
}
};
const handleToggle = () => {
setSidebarToggled(!sidebarToggled);
};

const calculateAge = (dob) => {
const birthDate = new Date(dob);
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const monthDifference = today.getMonth() - birthDate.getMonth();

// Adjust age if the birthday hasn't occurred yet this year
if (monthDifference < 0 || (monthDifference===0 && today.getDate() < birthDate.getDate())) { age--; } return age; };
  return ( <>
  <div className={`app sidebar-mini ${sidebarToggled ? "sidenav-toggled" : "" }`}>
    <Header handleToggle={handleToggle} />
    <Sidebar />
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={handleSubmit}>
                  {/* Aadhaar Number */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="adha_num">
                      Aadhaar Number
                    </label>
                    <input className="form-control" id="adha_num" type="text" name="adha_num" value={player.adha_num}
                      onChange={handleChange} required />
                  </div>

                  {/* First Name */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="pfnmae">
                      First Name
                    </label>
                    <input className="form-control" id="pfnmae" type="text" name="pfnmae" value={player.pfnmae}
                      onChange={handleChange} required />
                  </div>

                  {/* Middle Name */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="pmname">
                      Middle Name
                    </label>
                    <input className="form-control" id="pmname" type="text" name="pmname" value={player.pmname}
                      onChange={handleChange} required/>
                  </div>

                  {/* Last Name */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="plnmae">
                      Last Name
                    </label>
                    <input className="form-control" id="plnmae" type="text" name="plnmae" value={player.plnmae}
                      onChange={handleChange} required />
                  </div>

                  {/* Gender */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="gender">
                      Gender
                    </label>
                    <select className="form-control" id="gender" name="gender" value={player.gender}
                      onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Blood Group */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="bloodGroup">
                      Blood Group
                    </label>

                    <select className="form-control" id="bloodGroup" name="bloodGroup" value={player.bloodGroup}
                      onChange={handleChange} required>
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input className="form-control" id="email" type="email" name="email" value={player.email}
                      onChange={handleChange} required />
                  </div>

                  {/* Mobile */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="mobile">
                      Mobile
                    </label>
                    <input className="form-control" id="mobile" type="text" name="mobile" value={player.mobile}
                      onChange={handleChange} required />
                  </div>

                  {/* Permanent Address */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="permanentAddress">
                      Permanent Address
                    </label>
                    <input className="form-control" id="permanentAddress" type="text" name="permanentAddress"
                      value={player.permanentAddress} onChange={handleChange} required />
                  </div>

                  {/* Correspondence Address */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="correspondenceAddress">
                      Correspondence Address
                    </label>
                    <input className="form-control" id="correspondenceAddress" type="text" name="correspondenceAddress"
                      value={player.correspondenceAddress} onChange={handleChange} />
                  </div>

                  {/* Date of Birth Certificate No */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="dobCertNo">
                      Date of Birth Certificate No
                    </label>
                    <input className="form-control" id="dobCertNo" type="text" name="dobCertNo" value={player.dobCertNo}
                      onChange={handleChange}  />
                  </div>

                  {/* Date of Birth Certificate Date */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="dobCertDate">
                      Date of Birth Certificate Date
                    </label>
                    <input className="form-control" id="dobCertDate" type="date" name="dobCertDate"
                      value={player.dobCertDate} onChange={handleChange} />
                  </div>

                  {/* Date of Birth Certificate Place */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="dobCertPlace">
                      Date of Birth Certificate Place
                    </label>
                    <input className="form-control" id="dobCertPlace" type="text" name="dobCertPlace"
                      value={player.dobCertPlace} onChange={handleChange}  />
                  </div>

                  {/* School Certificate No */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="schoolCertNo">
                      School Certificate No
                    </label>
                    <input className="form-control" id="schoolCertNo" type="text" name="schoolCertNo"
                      value={player.schoolCertNo} onChange={handleChange} />
                  </div>

                  {/* SSC Certificate Date */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="sscCertDate">
                      SSC Certificate Date
                    </label>
                    <input className="form-control" id="sscCertDate" type="date" name="sscCertDate"
                      value={player.sscCertDate} onChange={handleChange}  />
                  </div>

                  {/* Father Name */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="fatherName">
                      Father Name
                    </label>
                    <input className="form-control" id="fatherName" type="text" name="fatherName"
                      value={player.fatherName} onChange={handleChange} required />
                  </div>

                  {/* Mother Name */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="motherName">
                      Mother Name
                    </label>
                    <input className="form-control" id="motherName" type="text" name="motherName"
                      value={player.motherName} onChange={handleChange} required />
                  </div>

                  {/* Guardian Name */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="guardianName">
                      Guardian Name
                    </label>
                    <input className="form-control" id="guardianName" type="text" name="guardianName"
                      value={player.guardianName} onChange={handleChange} required/>
                  </div>

                  {/* Relation Type */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="relationType">
                      Relation Type
                    </label>
                    <input className="form-control" id="relationType" type="text" name="relationType"
                      value={player.relationType} onChange={handleChange} requireds />
                  </div>

                  {/* Guardian Address */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="guardianAddress">
                      Guardian Address
                    </label>
                    <input className="form-control" id="guardianAddress" type="text" name="guardianAddress"
                      value={player.guardianAddress} onChange={handleChange} required />
                  </div>

                  {/* Emergency Contact */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="emergencyContact">
                      Emergency Contact
                    </label>
                    <input className="form-control" id="emergencyContact" type="text" name="emergencyContact"
                      value={player.emergencyContact} onChange={handleChange} required />
                  </div>

                  {/* Date of Birth */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="dob">
                      Date of Birth
                    </label>
                    <input className="form-control" id="dob" type="Date" name="dob" value={player.dob}
                      onChange={handleChange} required/>
                  </div>

                  {/* Age */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="age">
                      Age
                    </label>

                    <input className="form-control" id="age" type="number" name="age" value={player.age}
                      onChange={handleChange} readOnly />
                  </div>



                  {/* Player Type */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="playerType">Player Type</label>
                    <select className="form-control" id="playerType" name="playerType" value={player.playerType}
                      onChange={handleChange} required>
                      <option value="">Select Player Type</option>
                      <option value="All Rounder">All Rounder</option>
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="Wicket Keeper">Wicket Keeper</option>
                    </select>
                  </div>

                  {/* Conditionally render Batting Style and Batting Position for Batsman and All Rounder */}
                  {(player.playerType === 'All Rounder' || player.playerType === 'Batsman') && (
                  <>
                    {/* Batting Style */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="battingStyle">Batting Style</label>
                      <select className="form-control" id="battingStyle" name="battingStyle" value={player.battingStyle}
                        onChange={handleChange}>
                        <option value="">Select Batting Style</option>
                        <option value="Righthand Bat">Righthand Bat</option>
                        <option value="Lefthand Bat">Lefthand Bat</option>
                      </select>
                    </div>

                    {/* Batting Position */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="battingPosition">Batting Position</label>
                      <select className="form-control" id="battingPosition" name="battingPosition"
                        value={player.battingPosition} onChange={handleChange}>
                        <option value="">Select Batting Position</option>
                        <option value="Open">Open</option>
                        <option value="Middle order">Middle order</option>
                      </select>
                    </div>
                  </>
                  )}

                  {/* Conditionally render Bowling Style for Bowler and All Rounder */}
                  {(player.playerType === 'All Rounder' || player.playerType === 'Bowler') && (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="bowlingStyle">Bowling Style</label>
                    <select className="form-control" id="bowlingStyle" name="bowlingStyle" value={player.bowlingStyle}
                      onChange={handleChange}>
                      <option value="">Select Bowling Style</option>
                      <option value="RAF">RAF</option>
                      <option value="LAF">LAF</option>
                      <option value="RAOF">RAOF</option>
                      <option value="LAOF">LAOF</option>
                      <option value="RALS">RALS</option>
                      <option value="LALS">LALS</option>
                    </select>
                  </div>
                  )}


                  {/* Last Association */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="lastAssociation">
                      Last Association
                    </label>
                    <input className="form-control" id="lastAssociation" type="text" name="lastAssociation"
                      value={player.lastAssociation} onChange={handleChange} />
                  </div>

                  {/* Last Year */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="lastYear">
                      Last Year
                    </label>
                    <select className="form-control" id="lastYear" type="text" name="lastYear" value={player.lastYear}
                      onChange={handleChange}>
                      <option value="">Select Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                    </select>
                  </div>
                  


                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                      Update Player
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</>
);
}

export default EditPlayer;