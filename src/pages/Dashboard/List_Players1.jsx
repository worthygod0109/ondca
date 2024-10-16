import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";

function List_Players1() {
  const serverUrl = "https://ndca.onrender.com";
  const [players, setPlayers] = useState([]);
  const { id } = useParams(); // Fetch teamId from the URL
  const navigate = useNavigate(); // To redirect if not logged in
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  useEffect(() => {
    // Check if the user is logged in
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/Admin"); // Redirect to login page if not logged in
    }

    // Fetch player data by teamId from the backend
    axios
      .get(`${serverUrl}/Players-user/${id}`)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the player data!", error);
      });
  }, [id, navigate]); // Dependency array includes `id` and `navigate`

  const handleStatusChange = (playerId, status) => {
    const confirmMessage =
      status === "accepted"
        ? "Do you want to accept this player?"
        : "Do you want to reject this player?";

    if (window.confirm(confirmMessage)) {
      axios
        .put(`${serverUrl}/update-player-status/${playerId}`, { status })
        .then((response) => {
          // Update the player's status in the frontend after successfully updating it in the backend
          setPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
              player.id === playerId ? { ...player, status } : player
            )
          );
        })
        .catch((error) => {
          console.error("There was an error updating the player status!", error);
        });
    }
  };

  const deletePlayer = (playerId) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      axios
        .delete(`${serverUrl}/delete-player/${playerId}`)
        .then((response) => {
          alert(response.data.message);
          setPlayers(players.filter((player) => player.id !== playerId));
        })
        .catch((error) => {
          console.error("There was an error deleting the player!", error);
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
                            ) : player.status === "rejected" ? (
                              <span className="text-danger">Rejected</span>
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
                                to={`/viewplayer1/${player.id}`}
                              >
                                <i className="bi bi-eye-fill fs-5"></i>
                              </NavLink>

                              {/* Conditionally render edit and delete buttons */}
                              {player.status !== "accepted" && (
                                <>
                                  <NavLink
                                    className="btn btn-primary"
                                    to={`/EditPlayer1/${player.id}`}
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
      </div>
    </>
  );
}

export default List_Players1;
