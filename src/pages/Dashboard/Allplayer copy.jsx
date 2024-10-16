import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Allplayer() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch player data from the backend
    axios
      .get("http://localhost:8081/api/players")
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the player data!", error);
      });
  }, []);

  const handleStatusChange = (id, status) => {
    const confirmMessage = status === "accepted"
      ? "Do you want to accept this player?"
      : "Do you want to reject this player?";
    
    if (window.confirm(confirmMessage)) {
      axios
        .put(`http://localhost:8081/update-player-status/${id}`, { status })
        .then((response) => {
          // Update the player's status in the frontend after successfully updating it in the backend
          setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
              player.id === id ? { ...player, status } : player
            )
          );
        })
        .catch((error) => {
          console.error("There was an error updating the player status!", error);
        });
    }
  };

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

  return (
    <>
      <Header />
      <Sidebar />
      <main className="app-content">
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
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
                      {players.map((player, index) => (
                        <tr key={player.id}>
                          <td>{index + 1}</td> {/* Display index */}
                          <td>{player.player_fname}</td>
                          <td>{player.player_lname}</td>
                          <td>{player.player_email}</td>
                          <td>{player.player_mobile}</td>
                          <td>{player.playerType}</td>
                          <td>
                            {player.status === "accepted" ? (
                              <span className="text-success">Accepted</span>
                            ) : (
                              <>
                                <button
                                  className="btn btn-success me-2"
                                  onClick={() => handleStatusChange(player.id, "accepted")}
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleStatusChange(player.id, "rejected")}
                                >
                                  Reject
                                </button>
                              </>
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

export default Allplayer;
