import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import * as XLSX from "xlsx";
import "../Dashboard/css/List_tournaments.css";
import axios from "axios";

function AdminEnrollePlayer() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [playerDetails, setPlayerDetails] = useState({});
  const [teamDetails, setTeamDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [tournamentName, setTournamentName] = useState("");

  // Authentication logic to check if the user is logged in
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    fetch(`/team-details/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching team details");
        }
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        if (data.length > 0) {
          setTournamentName(data[0].TournamentName);
        }
        data.forEach((player) => {
          fetchPlayerDetails(player.playerid);
        });
      })
      .catch((error) => console.error("Error fetching team details:", error));
  }, [id]);

  const fetchPlayerDetails = (playerId) => {
    fetch(`/api-player/${playerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching player details for ID: ${playerId}`);
        }
        return response.json();
      })
      .then((details) => {
        setPlayerDetails((prevDetails) => ({
          ...prevDetails,
          [playerId]: details,
        }));

        if (details.TeamId) {
          fetchTeamDetails(details.TeamId);
        }
      })
      .catch((error) => console.error("Error fetching player details:", error));
  };

  const fetchTeamDetails = (teamId) => {
    fetch(`/get-team/${teamId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching team details for ID: ${teamId}`);
        }
        return response.json();
      })
      .then((team) => {
        setTeamDetails((prevTeams) => ({
          ...prevTeams,
          [teamId]: team.team_name,
        }));
      })
      .catch((error) => console.error("Error fetching team details:", error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlayers = players.filter((player) => {
    const details = playerDetails[player.playerid];
    if (!details) return false;

    const fullName = `${details.player_fname} ${details.player_lname}`.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    return (
      fullName.includes(searchTermLower) ||
      details.player_email.toLowerCase().includes(searchTermLower) ||
      details.player_mobile.includes(searchTermLower) ||
      teamDetails[details.TeamId]?.toLowerCase().includes(searchTermLower)
    );
  });

  const handleExcelDownload = () => {
    const dataToExport = filteredPlayers.length > 0 ? filteredPlayers : players;

    const data = dataToExport.map((player, index) => {
      const details = playerDetails[player.playerid];
      return {
        "#": index + 1,
        "Tournament Name": player.TournamentName,
        "First Name": details.player_fname,
        "Last Name": details.player_lname,
        Email: details.player_email,
        "Phone Number": details.player_mobile,
        "Player Type": details.playerType,
        "Club Name": teamDetails[details.TeamId],
        Status: details.status,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Players");

    XLSX.writeFile(workbook, "player_list.xlsx");
  };
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
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
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search players by name, email, or team"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="col-md-6 text-end">
                    <button
                      className="btn btn-success"
                      onClick={handleExcelDownload}
                    >
                      Download Excel
                    </button>
                  </div>
                </div>
                <h3 className="text-danger text-center pt-3 pb-3">
                  Tournament: {tournamentName || "Loading Tournament Name..."}
                </h3>
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Tournament Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Player Type</th>
                        <th>Club Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlayers.length === 0 ? (
                        <tr>
                          <td colSpan="10">No players found</td>
                        </tr>
                      ) : (
                        filteredPlayers.map((player, index) => {
                          const details = playerDetails[player.playerid];
                          const teamName = details
                            ? teamDetails[details.TeamId]
                            : "Loading...";
                          return (
                            <tr key={player.playerid}>
                              <td>{index + 1}</td>
                              <td>{player.TournamentName}</td>
                              <td>{details ? details.player_fname : "Loading..."}</td>
                              <td>{details ? details.player_lname : "Loading..."}</td>
                              <td>{details ? details.player_email : "Loading..."}</td>
                              <td>{details ? details.player_mobile : "Loading..."}</td>
                              <td>{details ? details.playerType : "Loading..."}</td>
                              <td>{teamName}</td>
                              <td>{details ? details.status : "Loading..."}</td>
                              <td>
                                <div className="btn-group">
                                  <NavLink
                                    className="btn btn-primary"
                                    to={`/viewplayer1/${player.playerid}`}
                                  >
                                    <i className="bi bi-eye-fill fs-5"></i>
                                  </NavLink>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
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

export default AdminEnrollePlayer;
