import { Project } from "./Project";
import { Link } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
import PageButtons from "./PageButtons";
import AddProject from "./AddProject";
const ProjectList = (props) => {
  // console.log(props.pages);
  return (
    <div>
      <AddProject onNewProject={props.handleProjectChange} />
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
