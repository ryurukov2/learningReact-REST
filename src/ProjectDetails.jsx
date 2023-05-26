import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const dataFetch = async (id, setProjectName, setRelatedTasks) => {
    fetch(`http://localhost:8000/api/projects/${id}/`)
      .then((r) => r.json())
      .then((r) => {
        setProjectName(r);
      });
    fetch(`http://localhost:8000/api/projects/${id}/tasks/`)
      .then((r) => r.json())
      .then((r) => {
        setRelatedTasks(r.results);
      });
  };

const ProjectDetails = () => {
    const { id } = useParams();
    const [projectName, setProjectName] = useState([]);
    const [relatedTasks, setRelatedTasks] = useState([]);

    useEffect(() => {
      dataFetch(id, setProjectName, setRelatedTasks);
    }, [id]);

    return (
      <div>
        <h1>{projectName.name}</h1>
        <p>Description: {projectName.description}</p>
        <h2>Tasks:</h2>
        {relatedTasks.map((relatedTask) => (
          <div key={relatedTask.id}>
            <span>{relatedTask.description}</span>
            <span> / {relatedTask.priority}</span>
            <span> / {relatedTask.completion_status}</span>
          </div>
        ))}
      </div>
    );
  }

export default ProjectDetails