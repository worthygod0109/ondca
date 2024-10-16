import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "./Header";
import Sidebar from "./Sidebar";

function Edit_News() {
  const serverUrl = "https://ndca.onrender.com";
  const { id } = useParams(); // Get the ID from the URL parameters
  const navigate = useNavigate(); // Create navigate function
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [formData, setFormData] = useState({
    Headline: "",
    Description: "",
    category: "", // New category field
    image1: null,
    image2: null,
    image3: null,
  });

  const [initialData, setInitialData] = useState(null); // To store the initial fetched data

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/Admin'); // Redirect to login page if not logged in
    }

    // Fetch the existing news data by ID
    const fetchNews = async () => {
      try {
        const response = await fetch(`${serverUrl}/news/${id}`);
        const result = await response.json();
        if (response.ok) {
          setFormData({
            Headline: result.Headline,
            Description: result.Description,
            category: result.category || "", // Set the category from backend
            image1: result.image1, // Assuming these are the image URLs or paths
            image2: result.image2,
            image3: result.image3,
          });
          setInitialData(result); // Store the initial data for comparison
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchNews();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        [name]: file,
        [`${name}_preview`]: previewUrl, // Store the preview URL in the state
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

    // Compare the current formData with the initialData
    if (
      formData.Headline === initialData.Headline &&
      formData.Description === initialData.Description &&
      formData.category === initialData.category &&
      formData.image1 === initialData.image1 &&
      formData.image2 === initialData.image2 &&
      formData.image3 === initialData.image3
    ) {
      alert("No changes in news.");
      return; // Exit the function if no changes are detected
    }

    const data = new FormData();
    data.append("Headline", formData.Headline);
    data.append("Description", formData.Description);
    data.append("category", formData.category); // Append category to form data

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
      const response = await fetch(`${serverUrl}/UpdateNews/${id}`, {
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

                    {/* Category Dropdown */}
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

                    {/* Image 1 */}
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
                      {formData.image1_preview ? (
                        <>
                          <p>Newly selected image:</p>
                          <img
                            src={formData.image1_preview}
                            alt="Image 1 Preview"
                            style={{ width: "200px", height: "auto" }}
                          />
                        </>
                      ) : formData.image1 && (
                        <>
                          <p>Current image:</p>
                          <img
                            src={`${serverUrl}${formData.image1}`}
                            alt="Image 1"
                            style={{ width: "200px", height: "auto" }}
                          />
                        </>
                      )}
                    </div>

                    {/* Image 2 */}
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
                      {formData.image2_preview ? (
                        <>
                          <p>Newly selected image:</p>
                          <img
                            src={formData.image2_preview}
                            alt="Image 2 Preview"
                            style={{ width: "200px", height: "auto" }}
                          />
                        </>
                      ) : formData.image2 && (
                        <>
                          <p>Current image:</p>
                          <img
                            src={`${serverUrl}${formData.image2}`}
                            alt="Image 2"
                            style={{ width: "200px", height: "auto" }}
                          />
                        </>
                      )}
                    </div>

                    {/* Image 3 */}
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
                      {formData.image3_preview ? (
                        <>
                          <p>Newly selected image:</p>
                          <img
                            src={formData.image3_preview}
                            alt="Image 3 Preview"
                            style={{ width: "200px", height: "auto" }}
                          />
                        </>
                      ) : formData.image3 && (
                        <>
                          <p>Current image:</p>
                          <img
                            src={`${serverUrl}${formData.image3}`}
                            alt="Image 3"
                            style={{ width: "200px", height: "auto" }}
                          />
                        </>
                      )}
                    </div>

                    <button className="btn btn-primary" type="submit">
                      Update News
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

export default Edit_News;
