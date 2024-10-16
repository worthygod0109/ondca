import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

function AddTeam() {
  const [formData, setFormData] = useState({
    teamName: "",
    teamLogo: null,
    captainName: "",
    contactNumber: "",
    email: "",
    aadhaarNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    tournamentId: "", // added for the selected tournament
  });

  const [fileName, setFileName] = useState("");
  const [tournaments, setTournaments] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch tournament names when component mounts
    axios
      .get("http://localhost:8081/get-tournament-names")
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tournament names:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "teamLogo" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      setFileName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const captainName = `${formData.Fname} ${formData.mName} ${formData.Lname}`;
    const formDataObj = new FormData();
    formDataObj.append("teamName", formData.teamName);
    formDataObj.append("teamLogo", formData.teamLogo);

    
    formDataObj.append("captainName", captainName);
    formDataObj.append("contactNumber", formData.contactNumber);
    formDataObj.append("email", formData.email);
    formDataObj.append("aadhaarNumber", formData.aadhaarNumber);
    formDataObj.append("username", formData.username);
    formDataObj.append("password", formData.password);
    formDataObj.append("confirmPassword", formData.confirmPassword);
    formDataObj.append("tournamentId", formData.tournamentId);

    axios
      .post("http://localhost:8081/add-team", formDataObj)
      .then((response) => {
        console.log(response.data);
        alert("Team added successfully!"); // Show success alert
        navigate("/List_team"); // Redirect to List_team page
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Display the error message from the server (e.g., password mismatch)
          alert(error.response.data.message);
        } else {
          console.error("Error adding team:", error);
          // Handle other errors
        }
      });
  };

  return (
    <>
    
      <Header />
      <Sidebar />
      <main className="app-content">``
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="row">
                <div className="col-lg-12">

              
                <h3 className='text-center bg-primary text-light p-3' >Captain & Team Registration</h3 >
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="tournamentSelect">
                        Tournament Name
                      </label>
                      <select
                        className="form-control"
                        id="tournamentSelect"
                        name="tournamentId"
                        value={formData.tournamentId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        {tournaments.map((tournament) => (
                          <option key={tournament.id} value={tournament.id}>
                            {tournament.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="teamName">
                        Team Name
                      </label>
                      <input
                        className="form-control"
                        id="teamName"
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="teamLogo">
                        Team Logo
                      </label>
                      <input
                        className="form-control"
                        id="teamLogo"
                        type="file"
                        name="teamLogo"
                        accept="image/*"
                        onChange={handleChange}
                        required
                      />
                      <small>{fileName}</small>
                    </div>
                    <div className="row">

                    <div className="col-md-4">
                      <label className="form-label" htmlFor="captainName">
                       C First Name
                      </label>
                      <input
                        className="form-control"
                        id="Fname"
                        type="text"
                        name="Fname"
                        value={formData.Fname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label" htmlFor="captainName">
                       C Middle Name
                      </label>
                      <input
                        className="form-control"
                        id="mName"
                        type="text"
                        name="mName"
                        value={formData.Mname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label" htmlFor="captainName">
                       C Last Name
                      </label>
                      <input
                        className="form-control"
                        id="Lname"
                        type="text"
                        name="Lname"
                        value={formData.Lname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="contactNumber">
                        Contact Number
                      </label>
                      <input
                        className="form-control"
                        id="contactNumber"
                        type="tel"
                        name="contactNumber" // Ensure this matches the backend
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email <span className="text-danger">(Should Be Given Properly Username & Password send on this mail )</span>
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="aadhaarNumber">
                        Aadhaar Number
                      </label>
                      <input
                        className="form-control"
                        id="aadhaarNumber"
                        type="text"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        className="form-control"
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddTeam;
