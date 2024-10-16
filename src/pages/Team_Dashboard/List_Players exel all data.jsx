import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";
import * as XLSX from "xlsx"; // Import the xlsx library

function List_Players() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  const teamId = localStorage.getItem("id");

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

  // Filter players based on the search term
  const filteredPlayers = players.filter((player) =>
    `${player.player_fname} ${player.player_lname}${player.player_email}${player.player_mobile}${player.status}${player.playerType}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to export data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPlayers.length > 0 ? filteredPlayers : players);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Players");
    XLSX.writeFile(wb, "players.xlsx");
  };

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
    </>
  );
}

export default List_Players;
