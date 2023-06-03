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
      {props.projects.map((project) => (
        <div key={project.id}>
          <Link to={`/projects/${project.id}`}>
            <Project project={project} />
          </Link>
          <DeleteButton
            handleProjectChange={props.handleProjectChange}
            projectId={project.id}
          />
        </div>
      ))}
      <PageButtons
        currentPage={props.currentPage}
        numPages={props.pages}
        setCurrentPage={props.setCurrentPage}
      />
    </div>
  );
};
export default ProjectList;
