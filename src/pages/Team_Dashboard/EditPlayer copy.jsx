import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from 'axios';

function EditPlayer() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [player, setPlayer] = useState({
    adha_num: '',
    pfnmae: '',
    pmname: '',
    plnmae: '',
    gender: '',
    bloodGroup: '',
    email: '',
    mobile: '',
    permanentAddress: '',
    correspondenceAddress: '',
    dobCertNo: '',
    dobCertDate: '',
    dobCertPlace: '',
    schoolCertNo: '',
    sscCertDate: '',
    fatherName: '',
    motherName: '',
    guardianName: '',
    relationType: '',
    guardianAddress: '',
    emergencyContact: '',
    dob: '',
    age: '',
    club1: '',
    club2: '',
    playerType: '',
    battingStyle: '',
    bowlingStyle: '',
    battingPosition: '',
    lastAssociation: '',
    lastYear: '',
  });
useEffect(() => {
  // Redirect to login page if not logged in
  const id = localStorage.getItem('id');
  if (!id) {
    navigate('/'); // If not logged in, redirect to Admin login page
  }
}, [navigate]);
  useEffect(() => {
   
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api-player/${id}`);
        const data = response.data;
        setPlayer({
          adha_num: data.player_aadhar_no || '',
          pfnmae: data.player_fname || '',
          pmname: data.player_mname || '',
          plnmae: data.player_lname || '',
          gender: data.player_gender || '',
          bloodGroup: data.player_blood_group || '',
          email: data.player_email || '',
          mobile: data.player_mobile || '',
          permanentAddress: data.player_per_addr || '',
          correspondenceAddress: data.player_cor_addr || '',
          dobCertNo: data.player_dob_cer_no || '',
          dobCertDate: data.player_dob_cer_date || '',
          dobCertPlace: data.player_dob_cer_place || '',
          schoolCertNo: data.player_sch_cer_no || '',
          sscCertDate: data.player_ssc_cer_date || '',
          fatherName: data.player_father_name || '',
          motherName: data.player_mother_name || '',
          guardianName: data.player_guard_name || '',
          relationType: data.player_relation || '',
          guardianAddress: data.player_guard_addr || '',
          emergencyContact: data.player_emerg_no || '',
          dob: data.player_dob || '',
          age: data.player_age || '',
          club1: data.club1 || '',
          club2: data.club2 || '',
          playerType: data.playerType || '',
          battingStyle: data.battingStyle || '',
          bowlingStyle: data.bowlingStyle || '',
          battingPosition: data.battingPosition || '',
          lastAssociation: data.lastAssociation || '',
          lastYear: data.lastYear || '',
        });
      } catch (error) {
        console.error('Error fetching player data:', error);
        // Optionally set an error state to display an error message
      }
    };

    fetchPlayerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer(prevPlayer => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPlayer = { ...player, status: 'pending' };
    try {
      const response = await axios.put(`${serverUrl}/update-player/${id}`, updatedPlayer);
      alert(response.data.message);
      navigate('/List_Player');  // Navigate to the list of players after successful update
    } catch (error) {
      console.error('Error updating player:', error);
      // Optionally set an error state to display an error message
    }
  };
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };

  return (
    <>
      <div className={`app sidebar-mini ${sidebarToggled ? 'sidenav-toggled' : ''}`}>
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
                      <input
                        className="form-control"
                        id="adha_num"
                        type="text"
                        name="adha_num"
                        value={player.adha_num}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* First Name */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="pfnmae">
                        First Name
                      </label>
                      <input
                        className="form-control"
                        id="pfnmae"
                        type="text"
                        name="pfnmae"
                        value={player.pfnmae}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Middle Name */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="pmname">
                        Middle Name
                      </label>
                      <input
                        className="form-control"
                        id="pmname"
                        type="text"
                        name="pmname"
                        value={player.pmname}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="plnmae">
                        Last Name
                      </label>
                      <input
                        className="form-control"
                        id="plnmae"
                        type="text"
                        name="plnmae"
                        value={player.plnmae}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Gender */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="gender">
                        Gender
                      </label>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={player.gender}
                        onChange={handleChange}
                        required
                      >
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


                      <select
                        className="form-control"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={player.bloodGroup}
                        onChange={handleChange}
                        required
                      >
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
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        value={player.email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Mobile */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="mobile">
                        Mobile
                      </label>
                      <input
                        className="form-control"
                        id="mobile"
                        type="text"
                        name="mobile"
                        value={player.mobile}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Permanent Address */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="permanentAddress">
                        Permanent Address
                      </label>
                      <input
                        className="form-control"
                        id="permanentAddress"
                        type="text"
                        name="permanentAddress"
                        value={player.permanentAddress}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Correspondence Address */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="correspondenceAddress">
                        Correspondence Address
                      </label>
                      <input
                        className="form-control"
                        id="correspondenceAddress"
                        type="text"
                        name="correspondenceAddress"
                        value={player.correspondenceAddress}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Date of Birth Certificate No */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="dobCertNo">
                        Date of Birth Certificate No
                      </label>
                      <input
                        className="form-control"
                        id="dobCertNo"
                        type="text"
                        name="dobCertNo"
                        value={player.dobCertNo}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Date of Birth Certificate Date */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="dobCertDate">
                        Date of Birth Certificate Date
                      </label>
                      <input
                        className="form-control"
                        id="dobCertDate"
                        type="date"
                        name="dobCertDate"
                        value={player.dobCertDate}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Date of Birth Certificate Place */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="dobCertPlace">
                        Date of Birth Certificate Place
                      </label>
                      <input
                        className="form-control"
                        id="dobCertPlace"
                        type="text"
                        name="dobCertPlace"
                        value={player.dobCertPlace}
                        onChange={handleChange}
                      />
                    </div>

                    {/* School Certificate No */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="schoolCertNo">
                        School Certificate No
                      </label>
                      <input
                        className="form-control"
                        id="schoolCertNo"
                        type="text"
                        name="schoolCertNo"
                        value={player.schoolCertNo}
                        onChange={handleChange}
                      />
                    </div>

                    {/* SSC Certificate Date */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="sscCertDate">
                        SSC Certificate Date
                      </label>
                      <input
                        className="form-control"
                        id="sscCertDate"
                        type="date"
                        name="sscCertDate"
                        value={player.sscCertDate}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Father Name */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="fatherName">
                        Father Name
                      </label>
                      <input
                        className="form-control"
                        id="fatherName"
                        type="text"
                        name="fatherName"
                        value={player.fatherName}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Mother Name */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="motherName">
                        Mother Name
                      </label>
                      <input
                        className="form-control"
                        id="motherName"
                        type="text"
                        name="motherName"
                        value={player.motherName}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Guardian Name */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="guardianName">
                        Guardian Name
                      </label>
                      <input
                        className="form-control"
                        id="guardianName"
                        type="text"
                        name="guardianName"
                        value={player.guardianName}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Relation Type */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="relationType">
                        Relation Type
                      </label>
                      <input
                        className="form-control"
                        id="relationType"
                        type="text"
                        name="relationType"
                        value={player.relationType}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Guardian Address */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="guardianAddress">
                        Guardian Address
                      </label>
                      <input
                        className="form-control"
                        id="guardianAddress"
                        type="text"
                        name="guardianAddress"
                        value={player.guardianAddress}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Emergency Contact */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="emergencyContact">
                        Emergency Contact
                      </label>
                      <input
                        className="form-control"
                        id="emergencyContact"
                        type="text"
                        name="emergencyContact"
                        value={player.emergencyContact}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="dob">
                        Date of Birth
                      </label>
                      <input
                        className="form-control"
                        id="dob"
                        type="date"
                        name="dob"
                        value={player.dob}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Age */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="age">
                        Age
                      </label>
                      <input
                        className="form-control"
                        id="age"
                        type="number"
                        name="age"
                        value={player.age}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Club 1 */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="club1">
                        Club 1
                      </label>
                      <input
                        className="form-control"
                        id="club1"
                        type="text"
                        name="club1"
                        value={player.club1}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Club 2 */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="club2">
                        Club 2
                      </label>
                      <input
                        className="form-control"
                        id="club2"
                        type="text"
                        name="club2"
                        value={player.club2}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Player Type */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="playerType">
                        Player Type
                      </label>
                      <input
                        className="form-control"
                        id="playerType"
                        type="text"
                        name="playerType"
                        value={player.playerType}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Batting Style */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="battingStyle">
                        Batting Style
                      </label>
                      <input
                        className="form-control"
                        id="battingStyle"
                        type="text"
                        name="battingStyle"
                        value={player.battingStyle}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Bowling Style */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="bowlingStyle">
                        Bowling Style
                      </label>
                      <input
                        className="form-control"
                        id="bowlingStyle"
                        type="text"
                        name="bowlingStyle"
                        value={player.bowlingStyle}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Batting Position */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="battingPosition">
                        Batting Position
                      </label>
                      <input
                        className="form-control"
                        id="battingPosition"
                        type="text"
                        name="battingPosition"
                        value={player.battingPosition}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Last Association */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="lastAssociation">
                        Last Association
                      </label>
                      <input
                        className="form-control"
                        id="lastAssociation"
                        type="text"
                        name="lastAssociation"
                        value={player.lastAssociation}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Last Year */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="lastYear">
                        Last Year
                      </label>
                      <input
                        className="form-control"
                        id="lastYear"
                        type="text"
                        name="lastYear"
                        value={player.lastYear}
                        onChange={handleChange}
                      />
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
