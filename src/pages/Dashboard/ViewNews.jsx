import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import Header from "./Header";
import Sidebar from "./Sidebar";

function ViewNews() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams(); // Get the ID from the URL parameters
  const [newsData, setNewsData] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch the news data by ID
    const fetchNews = async () => {
      try {
        const response = await fetch(`${serverUrl}/news/${id}`);
        const result = await response.json();
        if (response.ok) {
          setNewsData(result);
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNews();
  }, [id]);

  if (!newsData) {
    return <div>Loading...</div>; // Loading state while data is fetched
  }
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
                <div className="col-lg-12 text-center">
                  <h3><span>Headline: </span>{newsData.Headline}</h3>
                  <hr />
                  <p>{newsData.Description}</p>
                  <hr />
                  <div className="mb-3">
                    {newsData.image1 && (
                      <>
                        <p><strong>Image 1:</strong></p>
                        <img
                          src={`${serverUrl}${newsData.image1}`}
                          alt="Image 1"
                          style={{ width: "200px", height: "auto", display: "block", margin: "0 auto" }}
                        />
                      </>
                    )}
                  </div>
                  <hr />
                  <div className="mb-3">
                    {newsData.image2 && (
                      <>
                        <p><strong>Image 2:</strong></p>
                        <img
                          src={`${serverUrl}${newsData.image2}`}
                          alt="Image 2"
                          style={{ width: "200px", height: "auto", display: "block", margin: "0 auto" }}
                        />
                      </>
                    )}
                  </div>
                  <hr />
                  <div className="mb-3">
                    {newsData.image3 && (
                      <>
                        <p><strong>Image 3:</strong></p>
                        <img
                          src={`${serverUrl}${newsData.image3}`}
                          alt="Image 3"
                          style={{ width: "200px", height: "auto", display: "block", margin: "0 auto" }}
                        />
                      </>
                    )}
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

export default ViewNews;
