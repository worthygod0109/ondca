import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function ListviewNews() {
  const serverUrl = "https://ndca.onrender.com";
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle

  

  useEffect(() => {
    // Check for logged-in user
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    } else {
      // Fetch news data from the backend
      axios
        .get(`${serverUrl}/news`)
        .then((response) => {
          setNews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
        });
    }
  }, [navigate]);

  // Filter news based on search query
  const filteredNews = news.filter(
    (item) =>
      item.Headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle delete action
  const handleDelete = (id) => {
    axios
      .delete(`${serverUrl}/News/${id}`)
      .then((response) => {
        // Remove the deleted item from the state
        setNews(news.filter((item) => item.id !== id));
        alert("News item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting news item:", error);
        alert("Failed to delete news item");
      });
  };
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
              <div className="tile-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-bordered" id="sampleTable">
                    <thead>
                      <tr>
                        <th>News Headline</th>
                        <th>Description</th>
                        <th>Image 1</th>
                        <th>Image 2</th>
                        <th>Image 3</th>
                        <th>Published Time</th>
                        <th>Category</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNews.map((item) => (
                        <tr key={item.id}>
                          <td>{item.Headline}</td>
                          <td>{item.Description}</td>
                          <td>
                            {item.image1 && (
                              <img
                                src={`${serverUrl}${item.image1}`}
                                alt="Image 1"
                                width="100"
                              />
                            )}
                          </td>
                          <td>
                            {item.image2 && (
                              <img
                                src={`${serverUrl}${item.image2}`}
                                alt="Image 2"
                                width="100"
                              />
                            )}
                          </td>
                          <td>
                            {item.image3 && (
                              <img
                                src={`${serverUrl}${item.image3}`}
                                alt="Image 3"
                                width="100"
                              />
                            )}
                          </td>
                          <td>
                            {new Date(item.publicationDate)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(/ /g, "-")}
                          </td>
                          <td>{item.category}</td>
                          <td>
                            <div className="btn-group">
                              <NavLink
                                className="btn btn-primary"
                                to={`/viewNews/${item.id}`}
                              >
                                <i className="bi bi-eye-fill fs-5"></i>
                              </NavLink>
                              <NavLink
                                className="btn btn-primary"
                                to={`/Edit_News/${item.id}`}
                              >
                                <i className="bi bi-pencil-square fs-5"></i>
                              </NavLink>
                              <a
                                className="btn btn-danger"
                                href="#"
                                onClick={() => handleDelete(item.id)}
                              >
                                <i className="bi bi-trash fs-5"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default ListviewNews;
