import { useEffect, useState } from "react";
import { Project } from "./Project";
import { TaskDisplay } from "./TaskDisplay";
import { Link } from "react-router-dom";
const HomePage = ({ isLoggedIn }) => {
  const [latestProject, setLatestProject] = useState([]);
  const token = localStorage.getItem("authorizationToken");
  const fetchLastEdited = async () => {
    let headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    fetch("https://radoslavy.pythonanywhere.com/api/tasks/last_edited", {
      headers: headers_to_use,
    })
      .then((r) => {
        if (r.status === 200) {
          return r;
        } else if (r.status === 401) {
          throw Error("Not logged in.");
        } else {
          console.log(isLoggedIn);
          throw Error(r.status);
        }
      })
      .then((r) => r.json())
      .then((data) => {
        setLatestProject(data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchLastEdited();
    } else {
      setLatestProject([]);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div>Last Accessed Project</div>
      {latestProject.length !== 0 ? (
        <div className="w-4/5 h-auto base-border" id="no-hover-page">
          {
            <Link
              to={`/projects/${latestProject.project.id}`}
              className="group"
            >
              <Project project={latestProject.project} />
              <div className="relative flex-col justify-between items-center w-full group-hover:opacity-20">
                <div className="absolute w-full">
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
                    className="transition-all 
                                opacity-0
                                group-hover:opacity-100
                                group-hover:text-white
                                group-hover:translate-y-0
                                "
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
      ) : (
        <div className="w-3/5 h-500 base-border" id="no-hover-page">
          <div className="relative p-5">
            {isLoggedIn ? <p>Add projects.</p> : <p>Log in to view.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
