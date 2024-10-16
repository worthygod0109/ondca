import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Header({ handleToggle }) {
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend logout route if needed (optional)
      await fetch('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Error logging out:', error);
    }

    // Clear localStorage
    localStorage.removeItem('id');
    localStorage.removeItem('username');

    // Redirect to the login page
    navigate('/Admin');
  };

  return (
    <header className="app-header">
      <a className="app-header__logo" href="#">Ndca</a>
      <button className="app-sidebar__toggle" onClick={handleToggle} aria-label="Hide Sidebar"></button>
      <ul className="app-nav">
        <li className="dropdown">
          <a className="app-nav__item" href="#" data-bs-toggle="dropdown" aria-label="Open Profile Menu">
            <i className="bi bi-person fs-4"></i>
          </a>
          <ul className="dropdown-menu settings-menu dropdown-menu-right">
            {/* <li><a className="dropdown-item" href="page-user.html"><i className="bi bi-gear me-2 fs-5"></i> Settings</a></li>
            <li><a className="dropdown-item" href="page-user.html"><i className="bi bi-person me-2 fs-5"></i> Profile</a></li> */}
            {/* Logout button */}
            <li><button className="dropdown-item" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2 fs-5"></i> Logout</button></li>
          </ul>
        </li>
      </ul>
    </header>
  );
}

export default Header;
