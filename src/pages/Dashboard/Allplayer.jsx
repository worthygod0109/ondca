import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function Allplayer() {
  const serverUrl = "https://ndca.onrender.com";
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle

  // Check if the user is logged in
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  // Fetch player data from the backend
  useEffect(() => {
    axios
      .get(`${serverUrl}/api/players`)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the player data!", error);
      });
  }, []);

  // Filter players based on the search query
  const filteredPlayers = players.filter(player =>
    player.player_fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.player_lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.player_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.playerType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.player_mobile.includes(searchQuery)
  );

  // Function to export data to Excel with sequential IDs
  const exportToExcel = () => {
    const dataToExport = searchQuery ? filteredPlayers : players;

    // Map the data to include sequential IDs
    const dataForExcel = dataToExport.map((player, index) => ({
      id: index + 1,  // Sequential ID starting from 1
      player_fname: player.player_fname,
      player_lname: player.player_lname,
      player_email: player.player_email,
      player_mobile: player.player_mobile,
      playerType: player.playerType,
      status: player.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel, {
      header: [
        "id",
        "player_fname",
        "player_lname",
        "player_email",
        "player_mobile",
        "playerType",
        "status"
      ]
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Players");

    XLSX.writeFile(workbook, "players_data.xlsx");
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
                <div className="mb-3">
                  <div className="row">
                    <div className="col-md-4">
                      {/* Search input field */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search players..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2 ms-auto">
                      {/* Excel download button */}
                      <button
                        className="btn btn-success"
                        onClick={exportToExcel}
                      >
                        Export to Excel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table
                    className="table table-hover table-bordered"
                    id="sampleTable"
                  >
                    <thead>
                      <tr>
                        <th>id</th> {/* Index column */}
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
                      {filteredPlayers
                        .filter((player) => player.status === "accepted")
                        .map((player, index) => (
                          <tr key={player.id}>
                            <td>{index + 1}</td> {/* Display index */}
                            <td>{player.player_fname}</td>
                            <td>{player.player_lname}</td>
                            <td>{player.player_email}</td>
                            <td>{player.player_mobile}</td>
                            <td>{player.playerType}</td>
                            <td>
                              <span className="text-success">Accepted</span>
                            </td>
                            <td>
                              <div className="btn-group">
                                <NavLink
                                  className="btn btn-primary"
                                  to={`/viewplayer1/${player.id}`}
                                >
                                  <i className="bi bi-eye-fill fs-5"></i>
                                </NavLink>
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

export default Allplayer;
