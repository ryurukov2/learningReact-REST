import { Navbar } from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import HomePage from "./HomePage";

export default function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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

