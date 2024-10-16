import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function ViewPlayer() {
  
  const { id } = useParams();
  const [player, setPlayer] = useState({
    player_aadhar_no: '',
    player_fname: '',
    player_mname: '',
    player_lname: '',
    player_gender: '',
    player_blood_group: '',
    player_email: '',
    player_mobile: '',
    player_per_addr: '',
    player_cor_addr: '',
    player_dob_cer_no: '',
    player_dob_cer_date: '',
    player_dob_cer_place: '',
    player_sch_cer_no: '',
    player_ssc_cer_date: '',
    player_father_name: '',
    player_mother_name: '',
    player_guard_name: '',
    player_relation: '',
    player_guard_addr: '',
    player_emerg_no: '',
    player_dob: '',
    player_age: '',
    club1: '',
    club2: '',
    playerType: '',
    battingStyle: '',
    bowlingStyle: '',
    battingPosition: '',
    lastAssociation: '',
    lastYear: '',
    adharupload: '',
    Birth_certificate: '',
    ssc_certificate: '',
    school_lcertificate: '',
    passport: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8081/api-player/${id}`)
      .then(response => response.json())
      .then(data => setPlayer(data))
      .catch(error => console.error('Error fetching player:', error));
  }, [id]);

  const handleView = (fileName) => {
    window.open(`http://localhost:8081${fileName}`, '_blank');
  };

  return (
    <>
      <Header />
      <Sidebar />
      <main className="app-content">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 pt-3">
            <div className="tile">
              <div className="row">
                <div className="col-md-8 p-4">
                  {/* Personal Information */}
                  <h3>Personal Information</h3>
                  <div className="mb-3">
                    <label className="fw-bold">Aadhar Number: &nbsp;</label>
                    <span className="text-primary">{player.player_aadhar_no}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">First Name: &nbsp;</label>
                    <span className="text-primary">{player.player_fname} {player.player_mname} {player.player_lname}</span>
                  </div>
                
                  <div className="mb-3">
                    <label className="fw-bold">Gender: &nbsp;</label>
                    <span className="text-primary">{player.player_gender}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Blood Group: &nbsp;</label>
                    <span className="text-primary">{player.player_blood_group}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Email: &nbsp;</label>
                    <span className="text-primary">{player.player_email}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Phone Number: &nbsp;</label>
                    <span className="text-primary">{player.player_mobile}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Permanent Address: &nbsp;</label>
                    <span className="text-primary">{player.player_per_addr}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Correspondence Address: &nbsp;</label>
                    <span className="text-primary">{player.player_cor_addr}</span>
                  </div>

                  {/* Birth Certificate Information */}
                  <h3>Birth Certificate Information</h3>
                  <div className="mb-3">
                    <label className="fw-bold">DOB Certificate Number: &nbsp;</label>
                    <span className="text-primary">{player.player_dob_cer_no}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">DOB Certificate Date: &nbsp;</label>
                    <span className="text-primary">{player.player_dob_cer_date}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">DOB Certificate Place: &nbsp;</label>
                    <span className="text-primary">{player.player_dob_cer_place}</span>
                  </div>

                  {/* School Certificate Information */}
                  <h3>School Certificate Information</h3>
                  <div className="mb-3">
                    <label className="fw-bold">School Certificate Number: &nbsp;</label>
                    <span className="text-primary">{player.player_sch_cer_no}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">SSC Certificate Date: &nbsp;</label>
                    <span className="text-primary">{player.player_ssc_cer_date}</span>
                  </div>

                  {/* Family Information */}
                  <h3>Family Information</h3>
                  <div className="mb-3">
                    <label className="fw-bold">Father's Name: &nbsp;</label>
                    <span className="text-primary">{player.player_father_name}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Mother's Name: &nbsp;</label>
                    <span className="text-primary">{player.player_mother_name}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Guardian's Name: &nbsp;</label>
                    <span className="text-primary">{player.player_guard_name}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Relation Type: &nbsp;</label>
                    <span className="text-primary">{player.player_relation}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Guardian's Address: &nbsp;</label>
                    <span className="text-primary">{player.player_guard_addr}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Emergency Contact: &nbsp;</label>
                    <span className="text-primary">{player.player_emerg_no}</span>
                  </div>

                  {/* Other Information */}
                  <h3>Other Information</h3>
                  <div className="mb-3">
                    <label className="fw-bold">Date of Birth: &nbsp;</label>
                    <span className="text-primary">{player.player_dob}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Age: &nbsp;</label>
                    <span className="text-primary">{player.player_age}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Club 1: &nbsp;</label>
                    <span className="text-primary">{player.club1}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Club 2: &nbsp;</label>
                    <span className="text-primary">{player.club2}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Player Type: &nbsp;</label>
                    <span className="text-primary">{player.playerType}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Batting Style: &nbsp;</label>
                    <span className="text-primary">{player.battingStyle}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Bowling Style: &nbsp;</label>
                    <span className="text-primary">{player.bowlingStyle}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Batting Position: &nbsp;</label>
                    <span className="text-primary">{player.battingPosition}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Last Association: &nbsp;</label>
                    <span className="text-primary">{player.lastAssociation}</span>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Last Year: &nbsp;</label>
                    <span className="text-primary">{player.lastYear}</span>
                  </div>

                  {/* Uploaded Documents */}
                  <h3>Uploaded Documents</h3>
                  <div className="mb-3">
                    <label className="fw-bold">Aadhar Upload: &nbsp;</label>
                    <button onClick={() => handleView(player.adharupload)}>View</button>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Birth Certificate: &nbsp;</label>
                    <button onClick={() => handleView(player.Birth_certificate)}>View</button>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">SSC Certificate: &nbsp;</label>
                    <button onClick={() => handleView(player.ssc_certificate)}>View</button>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">School Leaving Certificate: &nbsp;</label>
                    <button onClick={() => handleView(player.school_lcertificate)}>View</button>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Passport: &nbsp;</label>
                    <button onClick={() => handleView(player.passport)}>View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </main>
    </>
  );
}

export default ViewPlayer;
