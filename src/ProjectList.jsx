import { Project } from "./Project";
import { Link } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import PageButtons from "./PageButtons";
import AddProject from "./AddProject";
import { useState } from "react";
const ProjectList = (props) => {
  // console.log(props.pages);
  const [toggleAdd, setToggleAdd] = useState(false)
  return (
    <div>
      <div className="text-end">
        <button className="btn-primary" onClick={() => setToggleAdd(!toggleAdd)}>
          Add Project
        </button>
      </div>
      {toggleAdd ? (
      <AddProject onNewProject={props.handleProjectChange} setToggleAdd={setToggleAdd} />
      ) : (
        null
      )}

      <PageButtons
        currentPage={props.currentPage}
        numPages={props.pages}
        setCurrentPage={props.setCurrentPage}
      />
      <div className="columns-2 w-4/5">
        <h1>Name</h1>
        <h1>Description</h1>
      </div>
      <ul>
        {props.projects.map((project) => (
          <li key={project.id} >
            <div className="w-auto flex justify-between items-center">
              <Link to={`/projects/${project.id}`} className="w-11/12">
                <Project project={project} />
              </Link>
              <DeleteButton
              className=""
                handleProjectChange={props.handleProjectChange}
                projectId={project.id}
              />
            </div>
          </li>
        ))}
      </ul>
      <PageButtons
        currentPage={props.currentPage}
        numPages={props.pages}
        setCurrentPage={props.setCurrentPage}
      />
    </div>
  );
};
export default ProjectList;
