import { Project } from "./Project";
import { Link } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";
const ProjectList = (props) => {
  console.log("asd");
  return (
    <div>
      {props.projects.map((project) => (
        <div key={project.id}>
          <Link to={`/projects/${project.id}`}>
            <Project project={project} />
          </Link>
          <DeleteButton
            handleDelete={props.handleDelete}
            projectId={project.id}
          />
        </div>
      ))}
    </div>
  );
};
export default ProjectList;
