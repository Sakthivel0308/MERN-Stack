import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./EditEmployee.css"; // Ensure this is the correct path to your CSS file

function EditEmployee() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/employees/${id}`);
      const { name, position } = response.data;
      setName(name);
      setPosition(position);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleEditEmployee = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:7000/employees/${id}`, {
        name,
        position,
      });
      navigate("/"); // Navigate back to the home or employee list page after successful update
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Employee</h1>
      <form onSubmit={handleEditEmployee}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            required
          />
        </div>
        <button className="add-link" type="submit">
          Save Changes
        </button>
      </form>
      <Link to="/" className="back-link">
        Back
      </Link>
    </div>
  );
}

export default EditEmployee;
