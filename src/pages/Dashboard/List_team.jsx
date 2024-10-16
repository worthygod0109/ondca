import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function List_team() {
  const serverUrl = "https://ndca.onrender.com";
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login if not logged in
    } else {
      fetchTeams(); // Fetch teams if logged in
    }
  }, [navigate]); // Add navigate to dependencies to avoid unnecessary re-renders

  const fetchTeams = () => {
    axios.get(`${serverUrl}/get-teams`)
      .then(response => {
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the team data!', error);
      });
  };

  const deleteTeam = (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      axios.delete(`${serverUrl}/delete-team/${id}`)
        .then(response => {
          alert('Team deleted successfully');
          setTeams(teams.filter(team => team.id !== id)); // Update state to remove the deleted team
        })
        .catch(error => {
          console.error('There was an error deleting the team!', error);
          alert('Failed to delete team');
        });
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
              <div className="tile-body">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th>Club Name</th>
                        <th>Club Member Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Aadhaar Number</th>
                        <th>Username</th>
                        <th>Password</th>
             
                        <th>View Players</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map(team => (
                        <tr key={team.id}>
                          <td>
                            <img src={`${serverUrl}${team.team_logo}`} alt="Team Logo" className="logo-img" />
                          </td>
                         
                          <td>{team.clubname}</td>
                 
                          <td>{team.captain_name}</td>
                          <td>{team.contact_number}</td>
                          <td>{team.email}</td>
                          <td>{team.aadhaar_number}</td>
                          <td>{team.username}</td>
                          <td>{team.password}</td>
                      
                          <td> <NavLink className="btn btn-primary" to={`/List_Player1/${team.id}`}>
                                View
                              </NavLink></td> {/* Display tournament name */}
                          <td>
                            <div className="btn-group">
                              <NavLink className="btn btn-primary" to={`/view-team/${team.id}`}>
                                <i className="bi bi-eye-fill fs-5"></i>
                              </NavLink>
                              <NavLink className="btn btn-primary" to={`/edit-team/${team.id}`}>
                                <i className="bi bi-pencil-square fs-5"></i>
                              </NavLink>
                              <button className="btn btn-danger" onClick={() => deleteTeam(team.id)}>
                                <i className="bi bi-trash fs-5"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default List_team;
