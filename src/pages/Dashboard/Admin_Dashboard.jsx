import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DataTable from './DataTable';

function Admin_Dashboard() {
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  useEffect(() => {
    // Check if the user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      // If not logged in, redirect to the login page
      navigate('/Admin');
    }
  }, [navigate]);
  
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };
  return (
    <>
        <div className={`app sidebar-mini ${sidebarToggled ? 'sidenav-toggled' : ''}`}>
        <Header handleToggle={handleToggle} /> {/* Pass handleToggle as prop */}
      <Sidebar />
      <DataTable />
      </div>
    </>
  );
}

export default Admin_Dashboard;
