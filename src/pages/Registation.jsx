import React from 'react';


import $ from 'jquery'; // Import jQuery if you are using it
import { useState } from 'react';


function Registration() {





  React.useEffect(() => {
    // Login Page Flipbox control
    $('.login-content [data-toggle="flip"]').click(function() {
      $('.login-box').toggleClass('flipped');
      return false;
    });
  }, []);

  

  return (
    <div>
      <section className="material-half-bg">
        <div className="cover"></div>
      </section>
      <section className="login-content">
        <div className="logo">
          <h1>Captain Registration</h1>
        </div>
        <div className="col-md-6">
          <div className="tile">
            <h3 className="tile-title">Captain Register</h3>
            <div className="tile-body">
              <form className="form-horizontal">
                <div className="mb-3 row">
                  <label className="form-label col-md-3">Name</label>
                  <div className="col-md-8">
                    <input className="form-control" type="text" placeholder="Enter full name" />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="form-label col-md-3">Email</label>
                  <div className="col-md-8">
                    <input className="form-control col-md-8" type="email" placeholder="Enter email address" />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="form-label col-md-3">Password</label>
                  <div className="col-md-8">
                    <input className="form-control col-md-8" type="Password" placeholder="Enter Password" />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="form-label col-md-3">Conform Password</label>
                  <div className="col-md-8">
                    <input className="form-control col-md-8" type="Password" placeholder="Confirm Password" />
                  </div>
                </div>
                {/* <div className="mb-3 row">
                  <label className="form-label col-md-3">Address</label>
                  <div className="col-md-8">
                    <textarea className="form-control" rows="4" placeholder="Enter your address"></textarea>
                  </div>
                </div> */}
                
                {/* <div className="mb-3 row">
                  <label className="form-label col-md-3">Identity Proof</label>
                  <div className="col-md-8">
                    <input className="form-control" type="file" />
                  </div>
                </div> */}
                <div className="mb-3 row">
                  <div className="col-md-8 col-md-offset-3">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" />I accept the terms and conditions
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="tile-footer">
              <div className="row">
                <div className="col-md-8 col-md-offset-3">
                  <button className="btn btn-primary" type="button">
                    <i className="bi bi-check-circle-fill me-2"></i>Register
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <a className="btn btn-secondary" href="#">
                    <i className="bi bi-x-circle-fill me-2"></i>Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registration;
