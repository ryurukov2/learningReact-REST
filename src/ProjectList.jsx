import { Project } from "./Project";
import { Link } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import PageButtons from "./PageButtons";
import AddProject from "./AddProject";
import { useState, useEffect, useRef } from "react";
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const pages = useRef(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_ITEMS = 20;

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const handleProjectChange = () => {
    fetchProjects();
  };
  const fetchProjects = () => {
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
  };
  // console.log(props.pages);
  const [toggleAdd, setToggleAdd] = useState(false);
  return (
    <div>
      <div className="text-end">
        <button
          className="btn-primary"
          onClick={() => setToggleAdd(!toggleAdd)}
        >
          Add Project
        </button>
      </div>
      {toggleAdd ? (
        <AddProject
          onNewProject={handleProjectChange}
          setToggleAdd={setToggleAdd}
        />
      ) : null}

      <PageButtons
        currentPage={currentPage}
        numPages={pages}
        setCurrentPage={setCurrentPage}
      />
      <div className="columns-2 w-4/5">
        <h1>Name</h1>
        <h1>Description</h1>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <div className="w-auto flex justify-between items-center">
              <Link to={`/projects/${project.id}`} className="w-11/12">
                <Project project={project} />
              </Link>
              <DeleteButton
                className=""
                handleProjectChange={handleProjectChange}
                projectId={project.id}
              />
            </div>
          </li>
        ))}
      </ul>
      <PageButtons
        currentPage={currentPage}
        numPages={pages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default ProjectList;
