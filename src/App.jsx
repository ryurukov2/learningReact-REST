import { preChangeSteps } from "./HelperFunctions";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./styles.css";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

export default function App() {
  const [projects, setProjects] = useState([]);
  // const scrollPosition = useRef(0);
  // const [pages, setPages] = useState(0);
  const pages = useRef(1)
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_ITEMS = 10;
  // const handleDelete = (id) => {
  //   preChangeSteps(scrollPosition);
  //   fetch("http://localhost:8000/api/projects/remove/" + id, {
  //     method: "DELETE",
  //   })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .finally(() => {
  //       handleProjectChange();

  //     });
  // };

  // const fetchProjects = fetchProjects(
  //   currentPage,
  //   setProjects,
  //   setPages,
  //   PAGINATION_ITEMS,
  //   scrollPosition
  // );
  useEffect(() => {
    fetchProjects(currentPage, setProjects, pages, PAGINATION_ITEMS);
  }, [currentPage]);

  const handleProjectChange = () => {
    fetchProjects(currentPage, setProjects, pages, PAGINATION_ITEMS);
  };
  return (
    <div>


      <Router>
        <Routes>
          {/* <Route path="/" element={<ProjectList1 />} /> */}
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
  // setPages,
  PAGINATION_ITEMS
) {
  fetch(`http://localhost:8000/api/projects/list?page=${currentPage}`)
    .then((r) => r.json())
    .then((data) => {
      setProjects(data.results);
      console.log(data.count)
      if(pages.current !== Math.ceil(data.count / PAGINATION_ITEMS)){
        pages.current = Math.ceil(data.count / PAGINATION_ITEMS)
      }
      
      // setPages(Math.ceil(data.count / PAGINATION_ITEMS));
      window.scrollTo(0, sessionStorage.getItem("scrollPos"));
      sessionStorage.setItem("scrollPos", 0)
    });
}
