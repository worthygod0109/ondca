import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

function Dashboard() {
  const [tournament, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [teamLogo, setTeamLogo] = useState('');
  const [teamName, setTeamName] = useState('');
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id'); // Get team ID from local storage
    if (!id) {
      navigate('/');
    }

    if (id) {
      // Fetch team data based on team ID
      axios.get(`http://localhost:8081/get-team/${id}`)
        .then(response => {
          const teamData = response.data;
          setTeamLogo(teamData.team_logo);
          setTeamName(teamData.team_name);

          // Fetch all tournaments
          axios.get('http://localhost:8081/get-tournaments')
            .then(res => {
              setTournaments(res.data);

              // Find the tournament that matches the team's tournament name
              const selected = res.data.find(t => t.name === teamData.tournament_name);
              setSelectedTournament(selected);
            })
            .catch(error => {
              console.error("Error fetching tournaments data:", error);
            });
        })
        .catch(error => {
          console.error("Error fetching team data:", error);
        });
    }
  }, [navigate]);

  // Toggle sidebar class on button click
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };

  return (
    <>
      <div className={`app sidebar-mini ${sidebarToggled ? 'sidenav-toggled' : ''}`}>
        <Header />
        <Sidebar />
        <main className="app-content">
          <div className="row">
            <button onClick={handleToggle}>Toggle</button> {/* Toggle button */}
            <div className="col-md-6 mx-auto">
              <div className="tile">
                <h3 className="tile-title text-center">Team</h3>
                {teamLogo && (
                  <div className="ratio ratio-4x3">
                    <img
                      src={`http://localhost:8081${teamLogo}`}
                      alt="Team Logo"
                      className="img-fluid"
                    />
                  </div>
                )}
                <h2 className="text-center">{teamName || 'Loading...'}</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
