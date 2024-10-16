import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Enrolledplay() {
  const [players, setPlayers] = useState([]);
  const [tournamentTeamData, setTournamentTeamData] = useState({});

  const teamId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/Players-user/${teamId}`)
      .then((response) => {
        setPlayers(response.data);
        response.data.forEach(player => {
          axios
            .get(`http://localhost:8081/team-details/${player.id}`)
            .then((res) => {
              setTournamentTeamData(prevData => ({
                ...prevData,
                [player.id]: res.data  // Store all tournaments for the player
              }));
            })
            .catch((error) => {
              console.error("There was an error fetching the tournament team data!", error);
            });
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the player data!", error);
      });
  }, [teamId]);

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
                  <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Player Type</th>
                        <th>Status</th>
                        <th>Tournament Name</th>
                        <th>Team Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players
                        .filter((player) => player.status === "accepted")
                        .map((player, index) => (
                          <tr key={player.id}>
                            <td>{index + 1}</td>
                            <td>{player.id}</td>
                            <td>{player.player_fname}</td>
                            <td>{player.player_lname}</td>
                            <td>{player.player_email}</td>
                            <td>{player.player_mobile}</td>
                            <td>{player.playerType}</td>
                            <td>
                              <span className="text-success">Accepted</span>
                            </td>
                            <td>
                              {tournamentTeamData[player.id] ? (
                                tournamentTeamData[player.id].map((tournament, i) => (
                                  <div key={i}>{tournament.TournamentName}</div>
                                ))
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>
                              {tournamentTeamData[player.id] ? (
                                tournamentTeamData[player.id].map((tournament, i) => (
                                  <div key={i}>{tournament.teamName}</div>
                                ))
                              ) : (
                                "N/A"
                              )}
                            </td>
                            <td>
                              <div className="btn-group">
                                <NavLink className="btn btn-primary" to={`/viewplayer/${player.id}`}>
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
    </>
  );
}

export default Enrolledplay;
