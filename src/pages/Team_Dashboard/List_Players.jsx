import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Import the xlsx library

function List_Players() {
  const serverUrl = "https://ndca.onrender.com";
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const navigate = useNavigate();
  const teamId = localStorage.getItem("id");
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  useEffect(() => {
    // Redirect to login page if not logged in
    const id = localStorage.getItem('id');
    if (!id) {
      navigate('/'); // If not logged in, redirect to Admin login page
    }
  }, [navigate]);
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };

  useEffect(() => {
    // Fetch player data by teamId from the backend
    axios
      .get(`${serverUrl}/Players-user/${teamId}`)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the player data!", error);
      });
  }, [teamId]);

  const deletePlayer = (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      axios
        .delete(`${serverUrl}/delete-player/${id}`)
        .then((response) => {
          alert(response.data.message);
          setPlayers(players.filter((player) => player.id !== id));
        })
        .catch((error) => {
          console.error("There was an error deleting the player!", error);
        });
    }
  };

  // Filter players based on the search term
  const filteredPlayers = players.filter((player) =>
    `${player.player_fname} ${player.player_lname}${player.player_email}${player.player_mobile}${player.status}${player.playerType}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to export data to Excel
  const exportToExcel = () => {
    // Define the columns we want in the Excel file
    const columns = [
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Player Type",
      "Status"
    ];

    // Map the filtered players to include only the required columns
    const data = (filteredPlayers.length > 0 ? filteredPlayers : players).map(player => ({
      "First Name": player.player_fname,
      "Last Name": player.player_lname,
      "Email": player.player_email,
      "Phone Number": player.player_mobile,
      "Player Type": player.playerType,
      "Status": player.status === "accepted" ? "Accepted" : 
                player.status === "rejected" ? "Rejected" : 
                player.status === "pending" ? "Pending" : ""
    }));

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(data, { header: columns });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Players");
    
    // Write the file
    XLSX.writeFile(wb, "players.xlsx");
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
              <div className="tile-body">
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="col-md-7 text-end">
                      <button className="btn btn-success" onClick={exportToExcel}>
                        Export to Excel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-bordered" id="sampleTable">
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
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player, index) => (
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
                              {player.status === "rejected" && (
                                <span className="text-danger">Rejected</span>
                              )}
                              {player.status === "pending" && (
                                <span className="text-warning">Pending</span>
                              )}
                            </td>
                            <td>
                              <div className="btn-group">
                                <NavLink className="btn btn-primary" to={`/viewplayer/${player.id}`}>
                                  <i className="bi bi-eye-fill fs-5"></i>
                                </NavLink>

                                {player.status !== "accepted" && (
                                  <>
                                    <NavLink className="btn btn-primary" to={`/EditPlayer/${player.id}`}>
                                      <i className="bi bi-pencil-square fs-5"></i>
                                    </NavLink>

                                    <a className="btn btn-danger" href="#" onClick={() => deletePlayer(player.id)}>
                                      <i className="bi bi-trash fs-5"></i>
                                    </a>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No players found
                          </td>
                        </tr>
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

export default List_Players;
