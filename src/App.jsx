import { Navbar } from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import HomePage from "./HomePage";
import { createContext, useState } from "react";

export const LoggedInContext = createContext(null);

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Router>
        <LoggedInContext.Provider value={isLoggedIn}>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </LoggedInContext.Provider>
      </Router>
    </div>
  );
}
