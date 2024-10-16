import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from 'axios';

function Edit_team() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState({
    teamName: '',
    teamLogo: '', // This will store the file or existing logo path
    captainName: '',
    contactNumber: '',
    email: '',
    aadhaarNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
    tournamentName: '',
  });

  const [fileName, setFileName] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [newLogo, setNewLogo] = useState(null); // This will store the new uploaded logo

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/get-team/${id}`);
        const data = response.data;
        setTeam({
          teamName: data.team_name || '',
          teamLogo: data.team_logo || '', // Store the current logo path
          captainName: data.captain_name || '',
          contactNumber: data.contact_number || '',
          email: data.email || '',
          aadhaarNumber: data.aadhaar_number || '',
          username: data.username || '',
          password: data.password || '',
          confirmPassword: data.confirm_password || '',
          tournamentName: data.tournament_name || '',
        });
        setFileName(data.team_logo ? data.team_logo.split('/').pop() : ''); // Extract the file name
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    const fetchTournamentNames = async () => {
      try {
        const response = await axios.get('http://localhost:8081/get-tournament-names');
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournament names:', error);
      }
    };

    fetchTeamData();
    fetchTournamentNames();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'teamLogo' && files.length > 0) {
      setTeam(prevTeam => ({
        ...prevTeam,
        teamLogo: files[0], // Set the new file
      }));
      setNewLogo(URL.createObjectURL(files[0])); // Preview the new logo
      setFileName(files[0].name); // Update the file name
    } else {
      setTeam(prevTeam => ({
        ...prevTeam,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (team.password !== team.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('teamName', team.teamName);
    formData.append('teamLogo', team.teamLogo); // Append the new logo file or keep the existing logo path
    formData.append('captainName', team.captainName);
    formData.append('contactNumber', team.contactNumber);
    formData.append('email', team.email);
    formData.append('aadhaarNumber', team.aadhaarNumber);
    formData.append('username', team.username);
    formData.append('password', team.password);
    formData.append('confirmPassword', team.confirmPassword);
    formData.append('tournamentName', team.tournamentName);

    try {
      const response = await axios.post(`http://localhost:8081/update-team/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure multipart/form-data for file upload
        },
      });
      alert(response.data.message);
      navigate('/List_team');
    } catch (error) {
      console.error('Error updating team:', error);
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
              <div className="row">
                <div className="col-lg-12">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="tournamentSelect">
                        Tournament Name
                      </label>
                      <select
                        className="form-control"
                        id="tournamentSelect"
                        name="tournamentName"
                        value={team.tournamentName}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        {tournaments.map(tournament => (
                          <option key={tournament.id} value={tournament.name}>
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
                        value={team.teamName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="teamLogo">
                        Team Logo
                      </label>
                      {team.teamLogo && !newLogo && (
                        <div className="mb-1">
                          <img
                            src={`http://localhost:8081${team.teamLogo}`}
                            alt="Current Team Logo"
                            className="img-thumbnail"
                            style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                          />
                        </div>
                      )}
                      {newLogo && (
                        <div className="mb-1">
                          <img
                            src={newLogo}
                            alt="New Team Logo"
                            className="img-thumbnail"
                            style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                          />
                        </div>
                      )}
                      <input
                        className="form-control"
                        id="teamLogo"
                        type="file"
                        name="teamLogo"
                        accept="image/*"
                        onChange={handleChange}
                      />
                      <small>{fileName}</small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="captainName">
                        Captain Name
                      </label>
                      <input
                        className="form-control"
                        id="captainName"
                        type="text"
                        name="captainName"
                        value={team.captainName}
                        onChange={handleChange}
                        required
                      />
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
                        value={team.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        name="email"
                        value={team.email}
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
                        value={team.aadhaarNumber}
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
                        value={team.username}
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
                        value={team.password}
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
                        value={team.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Update Team
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

export default Edit_team;


// app.post('/update-team/:id', upload.single('teamLogo'), (req, res) => {
//   const { id } = req.params;
//   const { teamName, captainName, contactNumber, email, aadhaarNumber, username, password, confirmPassword, tournamentName } = req.body;
//   let teamLogo = req.file ? path.join('/uploads', 'team_logo', req.file.filename) : null;

//   if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Password and Confirm Password do not match' });
//   }

//   const getCurrentDataQuery = 'SELECT team_logo, username, password FROM add_team WHERE id = ?';
//   db.query(getCurrentDataQuery, [id], (err, results) => {
//       if (err) {
//           console.error('Error fetching current team data:', err);
//           return res.status(500).send('Server error');
//       }

//       const currentLogo = results[0].team_logo;
//       const currentUsername = results[0].username;
//       const currentPassword = results[0].password;

//       // If no new logo uploaded, keep the old one
//       if (!teamLogo && currentLogo) {
//           teamLogo = currentLogo;
//       }

//       const updateQuery = `
//           UPDATE add_team
//           SET team_name = ?, team_logo = ?, captain_name = ?, contact_number = ?, email = ?, aadhaar_number = ?, username = ?, password = ?, tournament_name = ?
//           WHERE id = ?
//       `;
//       db.query(updateQuery, [teamName, teamLogo, captainName, contactNumber, email, aadhaarNumber, username, password, tournamentName, id], (err) => {
//           if (err) {
//               console.error('Error updating data in the database:', err);
//               return res.status(500).send('Server error');
//           }

//           // Email functionality
//           let transporter = nodemailer.createTransport({
//               service: 'gmail',
//               auth: {
//                   user: 'khadpranav908@gmail.com',
//                   pass: 'ljsecegqqlxmvkpp'
//               }
//           });

//           let mailOptions = {
//               from: 'khadpranav908@gmail.com',
//               to: email,
//               subject: 'Team Information Updated',
//               html: `
//                   <p>Hello ${captainName},</p>
//                   <p>Your team "<strong>${teamName}</strong>" has been updated successfully.</p>
//                   ${username !== currentUsername ? `<p>Username has been changed to: <b>${username}</b></p>` : ''}
//                   ${password !== currentPassword ? `<p>Password has been changed.</p>` : ''}
//                   <p>Best of luck in the tournament!</p>
//               `
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//               if (error) {
//                   console.log('Error Occurred: ' + error);
//               } else {
//                   console.log('Email sent to: ' + email + ', ' + info.response);
//               }
//           });

//           res.send({ message: 'Team updated successfully' });
//       });
//   });
// });
