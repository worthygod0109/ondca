import React, { useState ,useEffect  } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';

function Addtournaments() {
    const serverUrl = "https://ndca.onrender.com";
    const [formData, setFormData] = useState({
        ageGroup: '',
        tournamentName: '',
        format: '',
        startDate: '',
        endDate: '',
        numberOfTeams: '',
        Logo: null,
        crickheros: '',
        sportlink: '',
    });
    const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
    const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };

    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/Admin'); // Redirect to login page if not logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'Logo') {
            setFileName(files ? files[0].name : '');
            setFormData({
                ...formData,
                [name]: files ? files[0] : null,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await fetch(`${serverUrl}/add-tournament`, {
                method: 'POST',
                body: data,
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                // Reset form data and file input
                setFormData({
                    ageGroup: '',
                    tournamentName: '',
                    format: '',
                    startDate: '',
                    endDate: '',
                    numberOfTeams: '',
                    Logo: null,
                    crickheros: '',
                    sportlink: '',
                });
                setFileName(''); // Clear file name display
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                                            <label className="form-label" htmlFor="ageGroup">Tournaments Age Groups</label>
                                            <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} className="form-select form-select-sm">
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
                                            <label className="form-label" htmlFor="Logo">Logo</label>
                                            <input 
                                                className="form-control" 
                                                id="Logo" 
                                                name="Logo" 
                                                type="file" 
                                                onChange={handleChange} 
                                            />
                                            {fileName && <p>Selected file: {fileName}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="tournamentName">Tournaments Name</label>
                                            <input className="form-control" id="tournamentName" name="tournamentName" type="text" placeholder="Tournaments Name" value={formData.tournamentName} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="format">Format</label>
                                            <select name="format" value={formData.format} onChange={handleChange} className="form-control">
                                                <option>Select</option>
                                                <option>T20</option>
                                                <option>One Day</option>
                                                <option>Two Days</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="startDate">Start Date</label>
                                            <input className="form-control" id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="endDate">End Date</label>
                                            <input className="form-control" id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="numberOfTeams">Number of Teams</label>
                                            <input className="form-control" id="numberOfTeams" name="numberOfTeams" type="number" placeholder="Number of Teams" value={formData.numberOfTeams} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="crickheros">Crickheros Link</label>
                                            <input className="form-control" id="crickheros" name="crickheros" type="text" placeholder="Crickheros Link" value={formData.crickheros} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="sportlink">Sports Link</label>
                                            <input className="form-control" id="sportlink" name="sportlink" type="text" placeholder="Sports Link" value={formData.sportlink} onChange={handleChange} />
                                        </div>
                                        <button className="btn btn-primary" type="submit">Submit</button>
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

export default Addtournaments;
