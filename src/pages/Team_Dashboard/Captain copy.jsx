import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Captain() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8081/captain-login', { username, password });
        if (response.data.message === 'Login successful') {
            const { id } = response.data;
            localStorage.setItem('id', id); // Store the team ID in local storage
            navigate('/Team_dash'); // Redirect to the team dashboard
        } else {
            setErrorMessage('Invalid username or password');
        }
    } catch (error) {
        setErrorMessage('Server error. Please try again later.');
    }
};

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-transparent bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="btn btn-danger btn-block" aria-current="page" href="/Admin">Admin</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="material-half-bg">
        <div className="cover"></div>
      </section>

      <section className="login-content">
        <div className="logo">
          <h1>Captain Login</h1>
        </div>
        <div className="login-box">
          <form className="login-form" onSubmit={handleLogin}>
            <h3 className="login-head"><i className="bi bi-person me-2"></i>SIGN IN</h3>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input 
                className="form-control" 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus 
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
              />
            </div>
            <div className="mb-3 btn-container d-grid">
              <button className="btn btn-primary btn-block"><i className="bi bi-box-arrow-in-right me-2 fs-5"></i>SIGN IN</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Captain;
