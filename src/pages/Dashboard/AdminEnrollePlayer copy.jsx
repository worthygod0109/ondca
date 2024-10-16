import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminEnrollePlayer() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams(); // Get tournament id from URL
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch players data for the specific tournament
    fetch(`${serverUrl}/get-players/${id}`) // Replace with your endpoint
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => console.error("Error fetching players:", error));
  }, [id]);

  return (
    <>
    <Header/>
    <Sidebar/>
    <div>
      <h1>Players in Tournament {id}</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
      </div>
    </>
  );
}

export default AdminEnrollePlayer;
