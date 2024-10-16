import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";

function Edit_tournaments() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };
  const [tournament, setTournament] = useState({
    age_group: '',
    name: '',
    format: '',
    start_date: '',
    end_date: '',
    number_of_teams: '',
    logo: null,
  });

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }

    // Fetch tournament data based on the ID
    fetch(`${serverUrl}/get-tournament/${id}`)
      .then(response => response.json())
      .then(data => setTournament(data))
      .catch(error => console.error('Error fetching tournament:', error));
  }, [id, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ageGroup', tournament.age_group);
    formData.append('tournamentName', tournament.name);
    formData.append('format', tournament.format);
    formData.append('startDate', tournament.start_date); // Ensure this matches
    formData.append('endDate', tournament.end_date); // Ensure this matches
    formData.append('numberOfTeams', tournament.number_of_teams);

    if (e.target.Logo.files[0]) {
        formData.append('Logo', e.target.Logo.files[0]);
    }

    // Log the form data for debugging
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    fetch(`${serverUrl}/update-tournament/${id}`, {
        method: 'PUT',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            navigate('/List_tournaments');
        })
        .catch(error => console.error('Error updating tournament:', error));
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
              <div className="row">
                <div className="col-lg-12">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="Logo">Logo</label>
                      {tournament.logo && (
                        <div className="mb-1">
                          <img 
                            src={`${serverUrl}${tournament.logo}`} 
                            alt="Current Tournament Logo" 
                            className="img-thumbnail" 
                            style={{ width: '150px', height: '150px', objectFit: 'contain' }} 
                          />
                        </div>
                      )}
                      <input 
                        className="form-control" 
                        id="Logo" 
                        name="Logo" 
                        type="file" 
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label" htmlFor="ageGroup">Tournaments Age Groups</label>
                      <select 
                        name="ageGroup" 
                        className="form-select form-select-sm" 
                        value={tournament.age_group} 
                        onChange={(e) => setTournament({ ...tournament, age_group: e.target.value })}
                      >
                        <option value="">Select</option>
                        <option value="Under 12">Under 12</option>
                        <option value="Under 14">Under 14</option>
                        <option value="Under 16">Under 16</option>
                        <option value="Under 19">Under 19</option>
                        <option value="Under 23">Under 23</option>
                        <option value="Open Mens">Open Mens</option>
                        <option value="Womens">Womens</option>
                      </select>
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label" htmlFor="tournamentName">Tournaments Name</label>
                      <input 
                        className="form-control" 
                        id="tournamentName" 
                        name="tournamentName" 
                        type="text" 
                        placeholder="Tournaments Name" 
                        value={tournament.name} 
                        onChange={(e) => setTournament({ ...tournament, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="format">Format</label>
                      <select 
                        name="format" 
                        className="form-control" 
                        value={tournament.format} 
                        onChange={(e) => setTournament({ ...tournament, format: e.target.value })}
                      >
                        <option>Select</option>
                        <option value="T20">T20</option>
                        <option value="One Day">One Day</option>
                        <option value="Two Days">Two Days</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="startDate">Start Date</label>
                      <input 
                        className="form-control" 
                        id="startDate" 
                        name="startDate" 
                        type="date" 
                        value={tournament.start_date.split('T')[0]} // Ensure the date is formatted correctly
                        onChange={(e) => setTournament({ ...tournament, start_date: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="endDate">End Date</label>
                      <input 
                        className="form-control" 
                        id="endDate" 
                        name="endDate" 
                        type="date" 
                        value={tournament.end_date.split('T')[0]} // Ensure the date is formatted correctly
                        onChange={(e) => setTournament({ ...tournament, end_date: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="numberOfTeams">Number of Teams</label>
                      <input 
                        className="form-control" 
                        id="numberOfTeams" 
                        name="numberOfTeams" 
                        type="number" 
                        placeholder="Number of Teams" 
                        value={tournament.number_of_teams} 
                        onChange={(e) => setTournament({ ...tournament, number_of_teams: e.target.value })}
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">Update</button>
                  </form>
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

export default Edit_tournaments;
