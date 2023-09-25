import React from "react";
import { Project } from "../../components/Project";

import { TaskDisplay } from "../ProjectDetailPage/TaskDisplay";

import { Link } from "react-router-dom";

export function LeftSideHome({ isLoggedIn, latestProject }) {
  return (
    <>
      {" "}
      {latestProject.length !== 0 ? (
        <div>
          Last Accessed Project
          <div className="base-border box-border" id="no-hover-page">
            {
              <Link
                to={`/projects/${latestProject.project.id}`}
                className="group"
              >
                <div className="relative flex-col box-border justify-between items-center w-full">
                  <Project project={latestProject.project} />
                  <div className="relative w-full">
                    <ul>
                      {latestProject.tasks.length > 0 ? (
                        latestProject.tasks.map((relatedTask) => (
                          <li key={relatedTask.id}>
                            <div className="flex">
                              <TaskDisplay
                                relatedTask={relatedTask}
                                canEdit={false}
                              />
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className="text-xl">No tasks yet</div>
                      )}
                    </ul>
                  </div>
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
                    <div className="relative top-1/3 text-xl group-hover:opacity-100">
                      Click for full project
                    </div>
                  </div>
                </div>
              </Link>
            }
          </div>
        </div>
      ) : (
        <div className="h-500 base-border" id="no-hover-page">
          <div className="relative p-5">
            {isLoggedIn ? <p>Add projects.</p> : <p>Log in to view.</p>}
          </div>
        </div>
      )}
    </>
  );
}
