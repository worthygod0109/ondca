import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../Dashboard/css/List_tournaments.css";
import { NavLink, useNavigate } from "react-router-dom";

// Helper function to format date
function formatDate(timestamp) {
   
  if (!timestamp) {
    return "Invalid Date"; // Return a default value or handle as needed
  }
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Return a default value or handle as needed
  }
  return date.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
}

function List_tournaments() {
  const serverUrl = "https://ndca.onrender.com";
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch tournaments data from backend
    fetch(`${serverUrl}/get-tournaments`) // Replace with your endpoint
      .then((response) => {
        // Check if the response is okay
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setTournaments(data);
      })
      .catch((error) => console.error("Error fetching tournaments:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${serverUrl}/delete-tournament/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setTournaments(
          tournaments.filter((tournament) => tournament.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting tournament:", error));
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
                <div className="table-responsive">
                  <table
                    className="table table-hover table-bordered"
                    id="sampleTable"
                  >
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th>Tournament Name</th>
                        <th>Age Group</th>
                        <th>Format</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Number of Teams</th>
                        <th>Enrolled Players</th> {/* New column header */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournaments.length === 0 ? (
                        <tr>
                          <td colSpan="9">No tournaments available</td> {/* Update colSpan */}
                        </tr>
                      ) : (
                        tournaments.map((tournament) => (
                          <tr key={tournament.id}>
                            <td>
                              <img
                                src={`${serverUrl}${tournament.logo}`}
                                alt="Tournament Logo"
                                className="logo-img"
                              />
                            </td>
                            <td>{tournament.name}</td>
                            <td>{tournament.age_group}</td>
                            <td>{tournament.format}</td>
                            <td>{formatDate(tournament.start_date)}</td>
                            <td>{formatDate(tournament.end_date)}</td>
                            <td>{tournament.number_of_teams}</td>
                            <td>
                              <NavLink
                                className="btn btn-primary"
                                to={`/AdminEnrollePlayer/${tournament.id}`}
                              >
                                View Players
                              </NavLink>
                            </td>
                            <td>
                              <div className="btn-group">
                                <NavLink
                                  className="btn btn-primary"
                                  to={`/view_Tournaments/${tournament.id}`}
                                >
                                  <i className="bi bi-eye-fill fs-5"></i>
                                </NavLink>
                                <NavLink
                                  className="btn btn-primary"
                                  to={`/Edit_tournaments/${tournament.id}`}
                                >
                                  <i className="bi bi-pencil-square fs-5"></i>
                                </NavLink>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(tournament.id)}
                                >
                                  <i className="bi bi-trash fs-5"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main></div>
    </>
  );
}

export default List_tournaments;
