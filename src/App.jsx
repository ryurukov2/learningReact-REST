import { Navbar } from "./Navbar";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./index.css";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import HomePage from "./HomePage";

export default function App() {
  const [projects, setProjects] = useState([]);
  const pages = useRef(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_ITEMS = 20;

  useEffect(() => {
    fetchProjects(currentPage, setProjects, pages, PAGINATION_ITEMS);
  }, [currentPage]);

  const handleProjectChange = () => {
    fetchProjects(currentPage, setProjects, pages, PAGINATION_ITEMS);
  };
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
                projects={projects}
                handleProjectChange={handleProjectChange}
                pages={pages.current}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </div>
  );
}
export function fetchProjects(
  currentPage,
  setProjects,
  pages,
  PAGINATION_ITEMS
) {
  fetch(`http://localhost:8000/api/projects/list?page=${currentPage}`)
    .then((r) => r.json())
    .then((data) => {
      setProjects(data.results);
      // console.log(data.count);
      if (pages.current !== Math.ceil(data.count / PAGINATION_ITEMS)) {
        pages.current = Math.ceil(data.count / PAGINATION_ITEMS);
      }

      window.scrollTo(0, sessionStorage.getItem("scrollPos"));
      sessionStorage.setItem("scrollPos", 0);
    });
}
