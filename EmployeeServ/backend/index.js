const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Dummy database (replace with a real database in production)
let employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Bob Johnson", position: "QA Engineer" },
];

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all employees
app.get("/employees", async (req, res) => {
  const result = await getEmployees();
  res.json(result);
});

// Get employee by ID
app.get("/employees/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const employee = await getEmployeeById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

// Add a new employee
app.post("/employees", async (req, res) => {
  const { name, position } = req.body;
  const employee = await addEmployee(name, position);
  res.status(201).json(employee);
});

// Update employee
app.put("/employees/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, position } = req.body;
  const updatedEmployee = await updateEmployee(id, name, position);
  if (updatedEmployee) {
    res.json(updatedEmployee);
  } else {
    res.status(404).send("Employee not found");
  }
});

// Delete employee
app.delete("/employees/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await deleteEmployee(id);
  if (result) {
    res.send("Employee deleted successfully");
  } else {
    res.status(404).send("Employee not found");
  }
});

// Helper functions
function getEmployees() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employees);
    }, 1000); // Simulating delay
  });
}

function getEmployeeById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employee = employees.find((emp) => emp.id === id);
      resolve(employee);
    }, 500); // Simulating delay
  });
}

function addEmployee(name, position) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = employees.length + 1;
      const newEmployee = { id, name, position };
      employees.push(newEmployee);
      resolve(newEmployee);
    }, 500); // Simulating delay
  });
}

function updateEmployee(id, name, position) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        employees[index] = { id, name, position };
        resolve(employees[index]);
      } else {
        resolve(null);
      }
    }, 500); // Simulating delay
  });
}

function deleteEmployee(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        employees.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500); // Simulating delay
  });
}

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const PORTS = [7000,4000,5000,6000]

PORTS.forEach(port => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

})