import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
