import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import EditEmployee from "./pages/EditEmployee/EditEmployee";
import HomeEmployee from "./pages/HomeEmployee/HomeEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeEmployee />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
