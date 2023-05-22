// ProjectList.js
import Project from './Project';

const ProjectList = (props) => {

    return (
        <div>
            {props.projects.map(project => (
                <Project key={project.id} project={project} onDelete={props.onProjectDelete} preChange={props.preChange}/>
            ))}
        </div>
    );
}

export default ProjectList;
