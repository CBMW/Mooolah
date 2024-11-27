import React, { useState, useEffect } from "react";
import "../css/EOI.css";

function EOI({ setShowPopup }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    console.log("EOI component mounted");
    return () => {
      console.log("EOI component unmounted");
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(`Field updated: ${name} = ${value}`);
  };

  // Mock handle submit
  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    alert("Expression of interest submitted successfully!");
    setShowPopup(false);
  };

  return (
    <div className="eoi-overlay">
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
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    </div>
  );  
}

export default EOI;
