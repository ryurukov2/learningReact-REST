import { useEffect, useState } from "react";
import { Project } from "./Project";
import { TaskDisplay } from "./TaskDisplay";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
const HomePage = () => {
  const [latestProject, setLatestProject] = useState([]);
  // const [latestProjectTasks, setLatestProjectTasks] = useState([]);
  const fetchLastEdited = async () => {
    fetch("http://localhost:8000/api/tasks/last_edited", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        // console.log(r)
        return r;
      })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data)
        setLatestProject(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchLastEdited();
  }, []);

  return (
    <div>
      <div>Last Accessed Project</div>
      {latestProject.length !== 0 ? (
        <div className="base-border" id="no-hover-page">
          <Project project={latestProject.project} />
          <div className="flex-col justify-between items-center w-full">
            <ul>
              {latestProject.tasks.map((relatedTask) => (
                <li key={relatedTask.id}>
                  <TaskDisplay relatedTask={relatedTask} canEdit={false} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
