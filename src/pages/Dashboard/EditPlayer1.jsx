import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';

function EditPlayer1() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [player, setPlayer] = useState({
    adha_num: '',
    pfname: '',
    pmname: '',
    plname: '',
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

  // Add the login check useEffect
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api-player/${id}`);
        const data = response.data;

        setPlayer({
          adha_num: data.player_aadhar_no || '',
          pfname: data.player_fname || '',
          pmname: data.player_mname || '',
          plname: data.player_lname || '',
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
      }
    };

    fetchPlayerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${serverUrl}/update-player/${id}`, player);
      alert(response.data.message);
      navigate(`/List_Player1/${id}`);
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };
  return (
    <>
      <div className={`app sidebar-mini ${sidebarToggled ? 'sidenav-toggled' : ''}`}>
      <Header handleToggle={handleToggle} /> {/* Pass handleToggle as prop */}
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
                      <label className="form-label" htmlFor="adha_num">Aadhaar Number</label>
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
                      <label className="form-label" htmlFor="pfname">First Name</label>
                      <input
                        className="form-control"
                        id="pfname"
                        type="text"
                        name="pfname"
                        value={player.pfname}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Middle Name */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="pmname">Middle Name</label>
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
                      <label className="form-label" htmlFor="plname">Last Name</label>
                      <input
                        className="form-control"
                        id="plname"
                        type="text"
                        name="plname"
                        value={player.plname}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Gender */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="gender">Gender</label>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={player.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Blood Group */}
                    <div className="mb-3">
                      <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
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
                      <label className="form-label" htmlFor="email">Email</label>
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
                      <label className="form-label" htmlFor="mobile">Mobile</label>
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
                      <label className="form-label" htmlFor="permanentAddress">Permanent Address</label>
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
                      <label className="form-label" htmlFor="correspondenceAddress">Correspondence Address</label>
                      <input
                        className="form-control"
                        id="correspondenceAddress"
                        type="text"
                        name="correspondenceAddress"
                        value={player.correspondenceAddress}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Other fields... */}
                    {/* Continue adding the remaining fields following the same pattern */}
                    
                    {/* Submit Button */}
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

export default EditPlayer1;
