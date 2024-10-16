import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";
import * as XLSX from "xlsx";

function List_Players() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const teamId = localStorage.getItem("id"); // Assuming teamId is stored in local storage

  useEffect(() => {
    // Fetch player data by teamId from the backend
    axios
      .get(`http://localhost:8081/Players-user/${teamId}`)
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
        .delete(`http://localhost:8081/delete-player/${id}`)
        .then((response) => {
          alert(response.data.message);
          setPlayers(players.filter((player) => player.id !== id));
        })
        .catch((error) => {
          console.error("There was an error deleting the player!", error);
        });
    }
  };

  // Function to export data to Excel with sequential IDs
  const exportToExcel = () => {
    const dataToExport = searchQuery
      ? players.filter(player =>
          player.player_fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.player_lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.player_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.playerType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.player_mobile.includes(searchQuery)
        )
      : players;

    // Map the data to include sequential IDs
    const dataForExcel = dataToExport.map((player, index) => ({
      id: index + 1, // Sequential ID starting from 1
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

  // Filter players based on search query
  const filteredPlayers = players.filter(player =>
    player.player_fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.player_lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.player_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.playerType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.player_mobile.includes(searchQuery)
  );

  return (
    <>
      <Header />
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
                        <th>#</th> {/* Index column */}
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
                              {/* Display the status with conditional styling */}
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
                                <NavLink
                                  className="btn btn-primary"
                                  to={`/viewplayer/${player.id}`}
                                >
                                  <i className="bi bi-eye-fill fs-5"></i>
                                </NavLink>

                                {/* Conditionally render Edit and Delete buttons based on player status */}
                                {player.status !== "accepted" && (
                                  <>
                                    <NavLink
                                      className="btn btn-primary"
                                      to={`/EditPlayer/${player.id}`}
                                    >
                                      <i className="bi bi-pencil-square fs-5"></i>
                                    </NavLink>
                                    <a
                                      className="btn btn-danger"
                                      href="#"
                                      onClick={() => deletePlayer(player.id)}
                                    >
                                      <i className="bi bi-trash fs-5"></i>
                                    </a>
                                  </>
                                )}
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
    </>
  );
}

export default List_Players;

