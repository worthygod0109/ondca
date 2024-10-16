import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";

function Tourn_Enroll() {
  const serverUrl = "https://ndca.onrender.com";
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();
  const teamId = localStorage.getItem("id");
  useEffect(() => {
    // Redirect to login page if not logged in
    const id = localStorage.getItem('id');
    if (!id) {
      navigate('/'); // If not logged in, redirect to Admin login page
    }
  }, [navigate]);
  useEffect(() => {
    // Fetch tournament names from the backend
    axios
      .get(`${serverUrl}/get-tournaments`)
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tournament names:", error);
      });

    // Fetch player data by teamId from the backend
    axios
      .get(`${serverUrl}/Players-user/${teamId}`)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the player data!", error);
      });

    // Fetch team name based on teamId
    axios
      .get(`${serverUrl}/get-team/${teamId}`)
      .then((response) => {
        setTeamName(response.data.team_name);
      })
      .catch((error) => {
        console.error("There was an error fetching the team data!", error);
      });
  }, [teamId]);

  // Handle tournament selection
  const handleTournamentChange = (e) => {
    setSelectedTournament(e.target.value);
  };

  // Handle player checkbox selection
  const handleCheckboxChange = (playerId) => {
    setSelectedPlayers((prevSelected) =>
      prevSelected.includes(playerId)
        ? prevSelected.filter((id) => id !== playerId)
        : [...prevSelected, playerId]
    );
  };

  // Handle enroll button click
  const handleEnroll = () => {
    // Find the selected tournament object
    const selectedTournamentObject = tournaments.find(
      (tournament) => tournament.id === Number(selectedTournament)
    );
  
    // Get the tournament name (fallback to an empty string if not found)
    const selectedTournamentName = selectedTournamentObject
      ? selectedTournamentObject.name
      : "Unknown Tournament";
  
    const enrollmentData = {
      teamId,
      teamName,
      tournamentId: selectedTournament,
      tournamentName: selectedTournamentName,
      playerIds: selectedPlayers,  // Send all selected player IDs
    };
  
    // POST request to enroll players for the team in the selected tournament
    axios
      .post(`${serverUrl}/enroll-team`, enrollmentData)
      .then((response) => {
        alert("Players enrolled successfully!");
        setSelectedPlayers([]);
        setSelectedTournament("");
      })
      .catch((error) => {
        console.error("There was an error enrolling the players!", error);
      });
  };
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };
  const acceptedPlayers = players.filter((player) => player.status === "accepted");

  return (
    <>
     <div className={`app sidebar-mini ${sidebarToggled ? 'sidenav-toggled' : ''}`}>
     <Header handleToggle={handleToggle} />
      <Sidebar />
      <main className="app-content">
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <h3 className="text-center mb-4">
                  Team Name: {teamName || "Loading..."}
                </h3>

                {/* Tournament selection */}
                <div className="row pb-3">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="tournamentSelect">Select Tournament</label>
                      <select
                        id="tournamentSelect"
                        className="form-control"
                        value={selectedTournament}
                        onChange={handleTournamentChange}
                      >
                        <option value="">Select a tournament</option>
                        {tournaments.map((tournament) => (
                          <option key={tournament.id} value={tournament.id}>
                            {tournament.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Table of Players */}
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Player Type</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Enroll</th>
                      </tr>
                    </thead>
                    <tbody>
                      {acceptedPlayers.length > 0 ? (
                        acceptedPlayers.map((player, index) => (
                          <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>{player.player_fname}</td>
                            <td>{player.player_lname}</td>
                            <td>{player.player_email}</td>
                            <td>{player.player_mobile}</td>
                            <td>{player.playerType}</td>
                            <td>
                              {player.status === "accepted" && (
                                <span className="text-success">Accepted</span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group">
                                <NavLink
                                  className="btn btn-primary"
                                  to={`/viewplayer/${player.id}`}
                                >
                                  <i className="bi bi-eye-fill fs-5"></i>
                                </NavLink>
                              </div>
                            </td>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedPlayers.includes(player.id)}
                                onChange={() => handleCheckboxChange(player.id)}
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No accepted players.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="row">
                  <div className="col-md-12 text-center">
                    <button className="btn btn-primary" onClick={handleEnroll}>
                      Enroll Team
                    </button>
                  </div>
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

export default Tourn_Enroll;
