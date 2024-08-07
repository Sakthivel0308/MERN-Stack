import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomeEmployee.css"; // Ensure this is the correct path to your CSS file

function HomeEmployee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:7000/employees");
      if (Array.isArray(response.data)) {
        setEmployees(response.data);
      } else {
        console.error(
          "Expected an array of employees but received:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/employees/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <div>
        <Link to="/add" className="add-link">
          Add Employee
        </Link>
      </div>
      <div>
        <h2>Employees</h2>
        <ul>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} - {employee.position}
                <div>
                  <button
                    className="add-link"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/edit/${employee.id}`} className="edit-link">
                    Edit
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <li>No employees found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HomeEmployee;
