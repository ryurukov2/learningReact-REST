import { Project } from "./Project";
import { Link } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import PageButtons from "./PageButtons";
import AddProject from "./AddProject";
import { useState, useEffect, useRef, useContext } from "react";
import { LoggedInContext } from "./App";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const pages = useRef(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_ITEMS = 20;
  const token = localStorage.getItem("authorizationToken");
  const isLoggedIn = useContext(LoggedInContext);
  // console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn === true) {
      fetchProjects();
    } else {
      setProjects([]);
    }
  }, [currentPage, isLoggedIn]);

  const handleProjectChange = () => {
    fetchProjects();
  };
  const fetchProjects = () => {
    let headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    fetch(`https://radoslavy.pythonanywhere.com/api/projects/list?page=${currentPage}`, {
      headers: headers_to_use,
    })
      .then((r) => {
        if (r.status === 200) {
          return r;
        } else {
          throw Error(`${r.status}`);
        }
      })
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.results);
        // console.log(data.count);
        if (pages.current !== Math.ceil(data.count / PAGINATION_ITEMS)) {
          pages.current = Math.ceil(data.count / PAGINATION_ITEMS);
        }

        window.scrollTo(0, sessionStorage.getItem("scrollPos"));
        sessionStorage.setItem("scrollPos", 0);
      })
      .catch((e) => console.log(e));
  };
  // console.log(props.pages);
  const [toggleAdd, setToggleAdd] = useState(false);
  return (
    <div>
      {isLoggedIn ? (
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
        </div>
      ) : (
        <div className="text-end">
          <button className="btn-primary btn-disabled" disabled>
            Add Project
          </button>
        </div>
      )}
      {pages > 0 ? (
        <PageButtons
          currentPage={currentPage}
          numPages={pages}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
      <div className="columns-2 w-4/5">
        <h1>Name</h1>
        <h1>Description</h1>
      </div>
      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
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
          ))
        ) : (
          <div>
          {isLoggedIn ? (
            <p>Add projects and they will be displayed here!</p>
            
            ):(
              <p>Log in to view your projects.</p>
              )
              
            }
            </div>
            )}
      </ul>
      {pages > 0 ? (
        <PageButtons
          currentPage={currentPage}
          numPages={pages}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </div>
  );
};
export default ProjectList;
