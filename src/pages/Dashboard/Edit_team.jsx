import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from 'axios';

function Edit_team() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [team, setTeam] = useState({
    teamName: '',
    teamLogo: '', // This will store the file or existing logo path
    captainName: '',
    contactNumber: '',
    email: '',
    aadhaarNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [fileName, setFileName] = useState('');
  const [newLogo, setNewLogo] = useState(null); // This will store the new uploaded logo

  // Check if the user is logged in
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/get-team/${id}`);
        const data = response.data;
        setTeam({
          teamName: data.team_name || '',
          teamLogo: data.team_logo || '', // Store the current logo path
          captainName: data.captain_name || '',
          contactNumber: data.contact_number || '',
          email: data.email || '',
          aadhaarNumber: data.aadhaar_number || '',
          username: data.username || '',
          password: data.password || '',
          confirmPassword: data.confirm_password || '',
        });
        setFileName(data.team_logo ? data.team_logo.split('/').pop() : ''); // Extract the file name
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    fetchTeamData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'teamLogo' && files.length > 0) {
      setTeam(prevTeam => ({
        ...prevTeam,
        teamLogo: files[0], // Set the new file
      }));
      setNewLogo(URL.createObjectURL(files[0])); // Preview the new logo
      setFileName(files[0].name); // Update the file name
    } else {
      setTeam(prevTeam => ({
        ...prevTeam,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (team.password !== team.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const formData = new FormData();
    formData.append('teamName', team.teamName);
    if (team.teamLogo instanceof File) {
      formData.append('teamLogo', team.teamLogo); // Append the new file
    }
    formData.append('captainName', team.captainName);
    formData.append('contactNumber', team.contactNumber);
    formData.append('email', team.email);
    formData.append('aadhaarNumber', team.aadhaarNumber);
    formData.append('username', team.username);
    formData.append('password', team.password);
    formData.append('confirmPassword', team.confirmPassword);

    try {
      const response = await axios.post(`${serverUrl}/update-team/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      navigate('/List_team');
    } catch (error) {
      console.error('Error updating team:', error);
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
                    <div className="mb-3">
                      <label className="form-label" htmlFor="teamName">
                        Team Name
                      </label>
                      <input
                        className="form-control"
                        id="teamName"
                        type="text"
                        name="teamName"
                        value={team.teamName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="teamLogo">
                        Team Logo
                      </label>
                      {team.teamLogo && !newLogo && (
                        <div className="mb-1">
                          <img
                            src={`${serverUrl}${team.teamLogo}`}
                            alt="Current Team Logo"
                            className="img-thumbnail"
                            style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                          />
                        </div>
                      )}
                      {newLogo && (
                        <div className="mb-1">
                          <img
                            src={newLogo}
                            alt="New Team Logo"
                            className="img-thumbnail"
                            style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                          />
                        </div>
                      )}
                      <input
                        className="form-control"
                        id="teamLogo"
                        type="file"
                        name="teamLogo"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      <small>{fileName}</small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="captainName">
                        Captain Name
                      </label>
                      <input
                        className="form-control"
                        id="captainName"
                        type="text"
                        name="captainName"
                        value={team.captainName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="contactNumber">
                        Contact Number
                      </label>
                      <input
  className="form-control"
  id="contactNumber"
  type="text"
  name="contactNumber"
  value={team.contactNumber}
  onChange={handleChange}
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  }}
  maxLength="10" // Limit to 10 digits
  pattern="\d{10}" // Only accept 10 digits
  title="Please enter exactly 10 digits"
  required
/>


                      

                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        value={team.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="aadhaarNumber">
                        Aadhaar Number
                      </label>
                      <input
                        className="form-control"
                        id="aadhaarNumber"
                        type="text"
                        name="aadhaarNumber"
                        value={team.aadhaarNumber}
                        onChange={handleChange}
                        onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  }}
  maxLength="12" // Limit to 10 digits
  pattern="\d{12}" // Only accept 10 digits
  title="Please enter exactly 12 digits"
  required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        className="form-control"
                        id="username"
                        type="text"
                        name="username"
                        value={team.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        name="password"
                        value={team.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={team.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Update Team
                    </button>
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

export default Edit_team;
