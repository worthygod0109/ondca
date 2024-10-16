import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./Header";
import Sidebar from "./Sidebar";

function News() {
  const serverUrl = "https://ndca.onrender.com";
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [formData, setFormData] = useState({
    Headline: "",
    Description: "",
    publicationDate: "", // Added state for date
    category: "", // New field for dropdown
    image1: null,
    image2: null,
    image3: null,
  });

  const navigate = useNavigate(); // Create navigate function

  // Check if user is logged in, if not redirect to login page
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
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
    data.append("Headline", formData.Headline);
    data.append("Description", formData.Description);
    data.append("publicationDate", formData.publicationDate); // Append date to form data
    data.append("category", formData.category); // Append selected category

    if (formData.image1) {
      data.append("image1", formData.image1);
    }
    if (formData.image2) {
      data.append("image2", formData.image2);
    }
    if (formData.image3) {
      data.append("image3", formData.image3);
    }

    try {
      const response = await fetch(`${serverUrl}/News`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Redirect to /ListviewNews after success
        navigate("/ListviewNews");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              <div className="row">
                <div className="col-lg-12">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="Headline">
                        Headline
                      </label>
                      <input
                        className="form-control"
                        id="Headline"
                        name="Headline"
                        type="text"
                        placeholder="Headline"
                        value={formData.Headline}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="Description">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="Description"
                        name="Description"
                        placeholder="Description"
                        value={formData.Description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="publicationDate">
                        Publication Date
                      </label>
                      <input
                        className="form-control"
                        id="publicationDate"
                        name="publicationDate"
                        type="date" // Date input field
                        value={formData.publicationDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="category">
                        Category
                      </label>
                      <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="News">News</option>
                        <option value="Paper Cutting">Paper Cutting</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="image1">
                        Image 1
                      </label>
                      <input
                        className="form-control"
                        id="image1"
                        name="image1"
                        type="file"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="image2">
                        Image 2
                      </label>
                      <input
                        className="form-control"
                        id="image2"
                        name="image2"
                        type="file"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="image3">
                        Image 3
                      </label>
                      <input
                        className="form-control"
                        id="image3"
                        name="image3"
                        type="file"
                        onChange={handleChange}
                      />
                    </div>

                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
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

export default News;
