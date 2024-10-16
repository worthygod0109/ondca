import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function ViewPlayer() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [player, setPlayer] = useState({
    player_aadhar_no: "",
    player_fname: "",
    player_mname: "",
    player_lname: "",
    player_gender: "",
    player_blood_group: "",
    player_email: "",
    player_mobile: "",
    player_per_addr: "",
    player_cor_addr: "",
    player_dob_cer_no: "",
    player_dob_cer_date: "",
    player_dob_cer_place: "",
    player_sch_cer_no: "",
    player_ssc_cer_date: "",
    player_father_name: "",
    player_mother_name: "",
    player_guard_name: "",
    player_relation: "",
    player_guard_addr: "",
    player_emerg_no: "",
    player_dob: "",
    player_age: "",
    club1: "",
    club2: "",
    playerType: "",
    battingStyle: "",
    bowlingStyle: "",
    battingPosition: "",
    lastAssociation: "",
    lastYear: "",
    adharupload: "",
    Birth_certificate: "",
    ssc_certificate: "",
    school_lcertificate: "",
    passport: "",
  });

  useEffect(() => {
    // Redirect to login page if not logged in
    const id = localStorage.getItem('id');
    if (!id) {
      navigate('/'); // If not logged in, redirect to Admin login page
    }
  }, [navigate]);
  
  useEffect(() => {
    fetch(`${serverUrl}/api-player/${id}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data))
      .catch((error) => console.error("Error fetching player:", error));
  }, [id]);

  const handleView = (fileName) => {
    window.open(`${serverUrl}${fileName}`, "_blank");
  };
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };

  return (
    <>
    <div className={`app sidebar-mini ${sidebarToggled ? 'sidenav-toggled' : ''}`}>
    <Header handleToggle={handleToggle} />
      <Sidebar />
      <main className="app-content">
        <div className="row">
          <div className="col-md-12 pt-3">
            <div className="tile">
              <div className="row">
                <div className="col-md-12 p-4">
                  <h2 className="text-center bg-primary text-light p-3">
                    Personal Information
                  </h2>
                  {/* Personal Information */}
                  <div className="row">
                    <div className="col-md-6 p-3">
                      <div className="mb-3 pt-2">
                        <label className="fw-bold fs-4 fs-4">
                          Aadhar Number: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_aadhar_no}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold  fs-4">
                          Player Name: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_fname} {player.player_mname}{" "}
                          {player.player_lname}
                        </span>
                      </div>

                      <div className="mb-3">
                        <label className="fw-bold fs-4">Gender: &nbsp;</label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_gender}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Blood Group: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_blood_group}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6 p-3">
                      <div className="mb-3">
                        <label className="fw-bold fs-4">Email: &nbsp;</label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_email}
                        </span>
                      </div>

                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Phone Number: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_mobile}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Permanent Address: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_per_addr}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Correspondence Address: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_cor_addr}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-center bg-primary text-light p-3">
                    Birth Information
                  </h2>

                  <div className="row">
                    <div className="col-md-6 p-3">
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          DOB Certificate Number: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_dob_cer_no}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          DOB Certificate Date: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_dob_cer_date}
                        </span>
                      </div>

                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          SSC Certificate Date: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_ssc_cer_date}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6 p-3">
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          DOB Certificate Place: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_dob_cer_place}
                        </span>
                      </div>

                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          School Certificate Number: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_sch_cer_no}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-center bg-primary text-light p-3">
                    Gardian Information
                  </h2>

                  <div className="row">
                    <div className="col-md-6 p-3">
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Father's Name: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_father_name}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Mother's Name: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_mother_name}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Guardian's Name: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_guard_name}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Relation Type: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_relation}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6 p-3">
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Guardian's Address: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_guard_addr}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Emergency Contact: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_emerg_no}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Date of Birth: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_dob}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">Age: &nbsp;</label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.player_age}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-center bg-primary text-light p-3">
                    Player Information
                  </h2>

                  <div className="row">
                    <div className="col-md-6 p-3">
                      
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Player Type: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.playerType}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Batting Style: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.battingStyle}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Last Year: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.lastYear}
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6 p-3">
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Bowling Style: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.bowlingStyle}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Batting Position: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.battingPosition}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4">
                          Last Association: &nbsp;
                        </label>
                        <span
                          className="fs-5 fw-bold"
                          style={{ color: "#DD2C00" }}
                        >
                          {player.lastAssociation}
                        </span>
                      </div>
                     
                    </div>
                  </div>

                  <h2 className="text-center bg-primary text-light p-3">
                    Uploaded Documents
                  </h2>

                  <div className="row">
                    <div class="col-md-6">
                      <div className="mb-3">
                        <label className="fw-bold fs-4 pb-2">
                          Aadhar Upload: &nbsp;
                        </label>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4  pb-2">
                          Birth Certificate: &nbsp;
                        </label>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4  pb-2">
                          SSC Certificate: &nbsp;
                        </label>
                      </div>
                      <div className="mb-3">
                        <label className="fw-bold fs-4 ">
                          School Leaving Certificate: &nbsp;
                        </label>
                      </div>
                      <div className="mb-3">
                        {/* Conditionally render the passport label and button */}
                        {player.passport && (
                          <>
                            <label className="fw-bold fs-4">
                              Passport: &nbsp;
                            </label>
                          
                          </>
                        )}
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleView(player.adharupload)}
                        >
                          View
                        </button>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleView(player.Birth_certificate)}
                        >
                          View
                        </button>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleView(player.ssc_certificate)}
                        >
                          View
                        </button>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleView(player.school_lcertificate)}
                        >
                          View
                        </button>
                      </div>
                      <div className="mb-3">
                        {/* Conditionally render the passport label and button */}
                        {player.passport && (
                          <>
                          
                            <button
                              className="btn btn-primary"
                              onClick={() => handleView(player.passport)}
                            >
                              View
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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

export default ViewPlayer;
