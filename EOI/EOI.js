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

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Add event listener for Escape key to close the popup
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Remove blur when popup is closed
      if (background) {
        background.classList.remove("blur-background");
      }

      // Re-enable background scrolling
      document.body.style.overflow = 'auto';

      // Remove event listener
      document.removeEventListener('keydown', handleKeyDown);
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

  // Updated formData without 'last_name'
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log("Form submitted with data:", formData);
    alert("Expression of interest submitted successfully!");
    closePopup();
  };

  return (
    <div
      className={`eoi-overlay ${isVisible ? "fade-in" : "fade-out"}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="eoi-title"
    >
      <div className="eoi-popup">
        {/* X Button */}
        <button
          className="eoi-close-button"
          onClick={closePopup}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 id="eoi-title">Expression of Interest</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          {/* Removed Last Name Field */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* Centered Submit Button */}
          <div className="eoi-submit-container">
            <button type="submit" className="eoi-submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EOI;
