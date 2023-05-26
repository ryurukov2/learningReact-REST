import { DeleteButton } from './DeleteButton';
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./styles.css";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";
import PageButtons from "./PageButtons";

export default function App() {
  const [projects, setProjects] = useState([]);
  const scrollPosition = useRef(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_ITEMS = 10;
  const handleDelete = (id) => {
    preChangeSteps();
    fetch("http://localhost:8000/api/projects/remove/" + id, {
      method: "DELETE",
    })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        handleProjectChange();
        
      });
  };

  const fetchProjects = newFunction(currentPage, setProjects, setPages, PAGINATION_ITEMS, scrollPosition);
  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  // function ProjectList1() {
  //   return (
  //     <div>
  //       <PageButtons
  //         currentPage={currentPage}
  //         numPages={pages}
  //         setCurrentPage={setCurrentPage}
  //         preChange={preChangeSteps}
  //       />
  //       {projects.map((project) => (
  //         <div key={project.id}>
  //           <Link to={`/projects/${project.id}`}>
  //             <h2>{project.name}</h2>
  //             <p>{project.description}</p>
  //           </Link>
  //           <DeleteButton   handleDelete={handleDelete}  />
  //         </div>
  //       ))}
  //       <PageButtons
  //         currentPage={currentPage}
  //         numPages={pages}
  //         setCurrentPage={setCurrentPage}
  //         preChange={preChangeSteps}
  //       />
  //     </div>
  //   );
  // }

  

  const preChangeSteps = () => {
    scrollPosition.current = window.scrollY;
  };
  const handleProjectChange = () => {
    fetchProjects();
  };
  return (
    <div>
      <AddProject onNewProject={handleProjectChange} />

      <Router>
        <Routes>
          {/* <Route path="/" element={<ProjectList1 />} /> */}
          <Route path="/projects" element={<ProjectList projects={projects} handleDelete={handleDelete} />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </div>
  );
}
function newFunction(currentPage, setProjects, setPages, PAGINATION_ITEMS, scrollPosition) {
  return async () => {
    const response = await fetch(
      `http://localhost:8000/api/projects/list?page=${currentPage}`
    );
    const data = await response.json();
    setProjects(data.results);
    console.log(data.results.length);
    setPages(Math.ceil(data.count / PAGINATION_ITEMS));
    window.scrollTo(0, scrollPosition.current);
  };
}

