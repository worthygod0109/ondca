import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin_login() {
  const serverUrl = "https://ndca.onrender.com";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert('Please fill in both username and password');
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/login`, { username, password });
      if (response.data.message === 'Login successful') {
        // Store username in localStorage
        localStorage.setItem('username', username);

        // Redirect to admin dashboard
        navigate('/Admin-dash');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
      alert('Server error');
    }
  };

  return (
    <div>
      <section className="material-half-bg">
        <div className="cover"></div>
      </section>

      <section className="login-content">
        <div className="logo">
          <h1>Admin Login</h1>
        </div>
        <div className={`login-box ${isFlipped ? 'flipped' : ''}`}>
          <form className="login-form" onSubmit={handleLogin}>
            <h3 className="login-head"><i className="bi bi-person me-2"></i>SIGN IN</h3>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input 
                className="form-control" 
                type="text" 
                placeholder="Username" 
                autoFocus 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                className="form-control" 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            <div className="mb-3 btn-container d-grid">
              <button type="submit" className="btn btn-primary btn-block">
                <i className="bi bi-box-arrow-in-right me-2 fs-5"></i>SIGN IN
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Admin_login;
