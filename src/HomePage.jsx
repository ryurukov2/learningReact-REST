import { useEffect, useState, useContext } from "react";
import { Project } from "./Project";
import { TaskDisplay } from "./TaskDisplay";
import { Link } from "react-router-dom";
import {  BASE_URL } from "./App";
const HomePage = ({ isLoggedIn }) => {
  const [latestProject, setLatestProject] = useState([]);
  const token = localStorage.getItem("authorizationToken");
  const URL = useContext(BASE_URL) 
  const fetchLastEdited = async () => {
    let headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    fetch(`${URL}/api/tasks/last_edited`, {
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
        <div className="w-4/5 base-border box-border" id="no-hover-page">
          {
            <Link
              to={`/projects/${latestProject.project.id}`}
              className="group"
            >
              <Project project={latestProject.project} />
              <div className="relative flex-col box-border justify-between items-center w-full">
                <div className="relative w-full">
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
                {/* <div className=""> */}
                  <div
                    className="absolute w-full h-full top-0 left-0
                    transition-all 
                                opacity-0
                                group-hover:opacity-100
                                group-hover:text-white
                               bg-gray-500
                                bg-opacity-80
                                group-hover:translate-y-0
                                "
                  >
                      <div className="relative top-1/2 text-2xl group-hover:opacity-100">
                        Click for full project
                    </div>
                  </div>
                {/* </div> */}
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
