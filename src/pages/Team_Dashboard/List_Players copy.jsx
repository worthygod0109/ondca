import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";

function List_Players() {
  const [players, setPlayers] = useState([]);

  const teamId = localStorage.getItem("id"); // this is nothing but

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

export default List_Players;
