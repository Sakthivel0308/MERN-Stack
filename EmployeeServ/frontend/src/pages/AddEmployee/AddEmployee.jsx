import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AddEmployee.css"; // Ensure this is the correct path to your CSS file

function AddEmployee() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const handleAddEmployee = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:7000/employees", { name, position });
      setName("");
      setPosition("");
      navigate("/"); // Navigate back to home or employee list page after successful addition
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleAddEmployee}>
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
          Add Employee
        </button>
      </form>
      <Link to="/" className="back-link">
        Back
      </Link>
    </div>
  );
}

export default AddEmployee;
