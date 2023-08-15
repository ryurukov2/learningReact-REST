import { useEffect, useState } from "react";
import { Project } from "./Project";
import { TaskDisplay } from "./TaskDisplay";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
const HomePage = ({isLoggedIn}) => {
  const [latestProject, setLatestProject] = useState([]);
  let headers_to_use = {};

  try {
    const token = localStorage.getItem("authorizationToken");
    headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
  } catch (error) {
    console.log(error);
  }
  const fetchLastEdited = async () => {
    fetch("http://localhost:8000/api/tasks/last_edited", {
      headers: headers_to_use,
    })
      .then((r) => {
        console.log(r.status);
        if (r.status === 200) {
          return r;
        }else{
          throw Error('Not logged in.')
        }
      })
      .then((r) => r.json())
      .then((data) => {
        setLatestProject(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(headers_to_use);
    fetchLastEdited();
  }, [isLoggedIn]);

  return (
    <div>
      <div>Last Accessed Project</div>
      {latestProject.length !== 0 ? (
        <div className="w-3/5 h-500 base-border" id="no-hover-page">
          {
          <Link to={`/projects/${latestProject.project.id}`} className="group">
            <Project project={latestProject.project} />
            <div className="relative flex-col justify-between items-center w-full group-hover:opacity-20">
              <div className="absolute">
                <ul>
                  {latestProject.tasks.map((relatedTask) => (
                    <li key={relatedTask.id}>
                      <div className="flex">
                        <TaskDisplay
                          relatedTask={relatedTask}
                          canEdit={false}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative p-5">
                <div
                  className="transition-all transform
                                translate-y-8 opacity-0
                                group-hover:opacity-100
                                group-hover:translate-y-0"
                >
                  <div className="p-2">
                    <p className="text-lg text-slate-100">
                      Click for full project
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          }
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
