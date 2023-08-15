import { Navbar } from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import HomePage from "./HomePage";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route
            path="/projects"
            element={
              <ProjectList
              
              />
            }
          />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

