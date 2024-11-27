import React, { useState, useEffect } from "react";
import "../css/EOI.css";

function EOI({ setShowPopup }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in effect and add blur to the background content
    setIsVisible(true);
    const background = document.getElementById("blur-content");
    if (background) {
      background.classList.add("blur-background");
    }

    return () => {
      // Remove blur when popup is closed
      if (background) {
        background.classList.remove("blur-background");
      }
    };
  }, []);

  const closePopup = () => {
    setIsVisible(false); // Trigger fade-out animation
    setTimeout(() => setShowPopup(false), 300); // Wait for fade-out effect
  };

  const handleOverlayClick = (e) => {
    if (e.target.className.includes("eoi-overlay")) {
      closePopup(); // Close popup when clicking outside
    }
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    alert("Expression of interest submitted successfully!");
    closePopup();
  };

  return (
    <div
      className={`eoi-overlay ${isVisible ? "fade-in" : "fade-out"}`}
      onClick={handleOverlayClick}
    >
      <div className="eoi-popup">
        <h2>Expression of Interest</h2>
        <form>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </form>
        <div className="eoi-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EOI;
