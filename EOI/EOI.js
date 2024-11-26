function EOI({ setShowPopup }) { // Accept setShowPopup as a prop
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      // Insert the data into the EOI table
      const { error } = await supabase.from("EOI").insert([formData]);

      if (error) {
        console.error("Error inserting data:", error.message);
      } else {
        alert("Expression of interest submitted successfully!");
      }

      // Close the popup
      setShowPopup(false);
    } catch (err) {
      console.error("Error:", err);
    }
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
