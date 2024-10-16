import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

function AddTeam() {
  const serverUrl = "https://ndca.onrender.com";
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [formData, setFormData] = useState({
    teamName: "",
    teamLogo: null,
    captainName: "",
    clubname: "",
    contactNumber: "",
    email: "",
    aadhaarNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    receipt: null, // Added for receipt file
    receiptNumber: "", // Added for receipt number
  });

  const [fileName, setFileName] = useState("");
  const [receiptFileName, setReceiptFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if user is logged in
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "teamLogo" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      setFileName(files[0].name);
    } else if (name === "receipt" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
      setReceiptFileName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    const captainName = `${formData.Fname} ${formData.mName} ${formData.Lname}`;
    const formDataObj = new FormData();
    formDataObj.append("teamName", formData.teamName);
    formDataObj.append("teamLogo", formData.teamLogo);
    formDataObj.append("clubname", formData.clubname);
    formDataObj.append("captainName", captainName);
    formDataObj.append("contactNumber", formData.contactNumber);
    formDataObj.append("email", formData.email);
    formDataObj.append("aadhaarNumber", formData.aadhaarNumber);
    formDataObj.append("username", formData.username);
    formDataObj.append("password", formData.password);
    formDataObj.append("confirmPassword", formData.confirmPassword);
    formDataObj.append("receipt", formData.receipt);
    formDataObj.append("receiptNumber", formData.receiptNumber);

    axios
      .post(`${serverUrl}/add-team`, formDataObj)
      .then((response) => {
        console.log(response.data);
        alert("Team added successfully!");
        navigate("/List_team");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          console.error("Error adding team:", error);
        }
      })
      .finally(() => {
        setIsSubmitting(false); // Reset submitting state
      });
  };

  const isSubmitButtonDisabled = !formData.receipt || isSubmitting;

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
              <div className="row">
                <div className="col-lg-12">
                  <h3 className="text-center bg-primary text-light p-3">
                    Authority Information
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="clubname">
                        Club Name
                      </label>
                      <input
                        className="form-control"
                        id="clubname"
                        type="text"
                        name="clubname"
                        value={formData.clubname}
                        onChange={handleChange}
                        required
                      />
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
                        Club Logo
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
                    <h4 className="text-center bg-primary text-light p-3">
                      Club Authorise Person Information
                    </h4>

                    <div className="row">
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="Fname">
                          First Name
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
                        <label className="form-label" htmlFor="mName">
                          Middle Name
                        </label>
                        <input
                          className="form-control"
                          id="mName"
                          type="text"
                          name="mName"
                          value={formData.mName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="Lname">
                          Last Name
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
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  }}
  maxLength="10" // Limit to 10 digits
  pattern="\d{10}" // Only accept 10 digits
  title="Please enter exactly 10 digits"
  required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email{" "}
                        <span className="text-danger">
                          (Should Be Given Properly Username & Password sent on
                          this mail)
                        </span>
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
                        onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
  }}
  maxLength="12" // Limit to 10 digits
  pattern="\d{12}" // Only accept 10 digits
  title="Please enter exactly 12 digits"
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
                    <h4 className="text-center bg-primary text-light p-3">
                      Club Enrollment Receipt
                    </h4>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="receiptNumber">
                        Receipt Number
                      </label>
                      <input
                        className="form-control"
                        id="receiptNumber"
                        type="text"
                        name="receiptNumber"
                        value={formData.receiptNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="receipt">
                        Upload Receipt
                      </label>
                      <input
                        className="form-control"
                        id="receipt"
                        type="file"
                        name="receipt"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleChange}
                        required
                      />
                      <small>{receiptFileName}</small>
                    </div>

                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={isSubmitButtonDisabled} // Disable button based on state
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
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

export default AddTeam;
