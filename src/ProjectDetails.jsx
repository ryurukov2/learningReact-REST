import { lazy } from "react";
import { TaskDisplay } from "./TaskDisplay";
import { TaskEdit } from "./TaskEdit";
import { Loading } from "./Loading";
const AddTask = lazy(() => import("./AddTask.jsx"));
import { useState, useEffect, useRef, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Suspense } from "react";
import { LoggedInContext, BASE_URL } from "./App";



const ProjectDetails = () => {
  const sortOrderOptions = [null, "desc", "asc"];
  const { id } = useParams();
  const [projectName, setProjectName] = useState([]);
  const [relatedTasks, setRelatedTasks] = useState([]);
  const [addTaskBtn, setAddTaskBtn] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const token = localStorage.getItem("authorizationToken");
  const isLoggedIn = useContext(LoggedInContext);
  const URL = useContext(BASE_URL) 

  const deleteFetch = async (task, token) => {

    let headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    const r = await fetch(`${URL}/api/task/${task.id}/remove`, {
      method: "DELETE",
      headers: headers_to_use,
    }).catch((er) => console.log(er));
    return r;
  };
  
  const updateFetch = async (
    id,
    updatedTask,
    relatedTasks,
    setRelatedTasks,
    fetchLoading,
    token
  ) => {
    let headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    fetch(`${URL}/api/task/${id}/edit`, {
      method: "PUT",
      headers: headers_to_use,
      body: JSON.stringify(updatedTask),
    })
      .then((r) => r.json())
      .then((data) => {
        const newTasksList = relatedTasks.map((t) => {
          if (t.id === data.id) {
            return data;
          }
          return t;
        });
        fetchLoading.current = null;
        setRelatedTasks(newTasksList);
      })
      .catch((er) => console.log(er));
  };
  const dataFetch = async (id, setProjectName, setRelatedTasks, token) => {
    let headers_to_use = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    fetch(`${URL}/api/projects/${id}/`, {
      headers: headers_to_use,
    })
      .then((r) => r.json())
      .then((r) => {
        setProjectName(r);
      })
      .catch((er) => console.log(er));
    fetch(`${URL}/api/projects/${id}/tasks/`, {
      headers: headers_to_use,
    })
      .then((r) => r.json())
      .then((r) => {
        setRelatedTasks(r);
      })
      .catch((er) => console.log(er));
  };
  const [task, setTask] = useState({
    id: "",
    description: "",
    priority: "",
    completion_status: "",
  });
  const fetchLoading = useRef(null);
  const sortBy = useRef({
    attrib: "id",
    ord: sortOrderOptions[0],
  });

  const statusValues = {
    TODO: 1,
    INPROGRESS: 2,
    ONHOLD: 3,
    RESOLVED: 4,
  };

  const sortingFunctions = {
    id: (a, b) => b.id - a.id,
    priority: (a, b) => b.priority - a.priority,
    description: (a, b) => b.description.length - a.description.length,
    status: (a, b) =>
      statusValues[b.completion_status] - statusValues[a.completion_status],
  };
  const orderFunctions = {
    null: (list) => list.sort((a, b) => a.id - b.id),
    asc: (list) => list.reverse(),
    desc: (list) => list,
  };
  const sortTasks = () => {
    
    let sortedTasks = [...relatedTasks].sort(
      sortingFunctions[sortBy.current.attrib]
    );
    sortedTasks = orderFunctions[sortBy.current.ord](sortedTasks);

    setRelatedTasks(sortedTasks);
  };
  const handleSortClick = (type) => {
    if (type !== sortBy.current["attrib"]) {
      sortBy.current["attrib"] = type;
      sortBy.current["ord"] = sortOrderOptions[1];
    } else {
      sortBy.current["ord"] =
        sortOrderOptions[
          (sortOrderOptions.indexOf(sortBy.current["ord"]) + 1) %
            sortOrderOptions.length
        ];
    }
    sortTasks();
    console.log(sortBy.current);
  };


  const handleDeleteClick = () => {
    deleteFetch(task, token)
      .then((deleteResponse) => {
        if (deleteResponse.status === 204) {
          setRelatedTasks(relatedTasks.filter((t) => t.id !== task.id));
        }
      })
      .catch((er) => console.log(er));
  };

  const handleEditOnclick = (relTask) => {
    setIsEditing(relTask.id);
    setTask(JSON.parse(JSON.stringify(relTask)));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleDoneClick = () => {
    const id = task.id;
    delete task["id"];
    fetchLoading.current = id;
    setIsEditing(null);
    updateFetch(id, task, relatedTasks, setRelatedTasks, fetchLoading, token);
  };

  const toggleBtn = () => {
    setAddTaskBtn(!addTaskBtn);
  };
  const addTaskToList = (newTask) => {
    setRelatedTasks([...relatedTasks, newTask]);
  };

  useEffect(() => {
  sortTasks();
  }, [relatedTasks.length])

  useEffect(() => {
    if (isLoggedIn === true) {
      dataFetch(id, setProjectName, setRelatedTasks, token);
    } else {
      setProjectName([]);
      setRelatedTasks([]);
    }
  }, [isLoggedIn]);

  return (
    <div className="relative">
    
      {isLoggedIn === false ? (
        <Navigate to="/" />
      ) : (
          <div>
            <h1 className="base-border">{projectName.name}</h1>
            <p className="base-border">
              Description: <br /> {projectName.description}
            </p>

            <div className="flex justify-between">
              <h2>Tasks:</h2>
              <button className="btn-primary" onClick={toggleBtn}>
                Add New Task
              </button>
            </div>

            <div className="flex flex-col items-center">
              {addTaskBtn === true ? (
                <Suspense fallback={<Loading />}>
                  <AddTask
                    id={id}
                    addTaskToList={addTaskToList}
                    toggleBtn={toggleBtn}
                  />
                </Suspense>
              ) : null}
            </div>
            <br />
            {relatedTasks.length !== 0 ? (
              <div>
                <div className="flex justify-between items-center w-full">
                  <span className="w-3/5">
                    <span onClick={() => handleSortClick("description")}>
                      Description
                    </span>
                  </span>
                  <span className="w-1/3">
                    <span onClick={() => handleSortClick("priority")}>
                      Priority
                    </span>
                  </span>
                  <span className="w-1/5">
                    <span onClick={() => handleSortClick("status")}>
                      Status
                    </span>{" "}
                  </span>
                </div>

                <div id="non-resolved-display">
                  <ul>
                    {relatedTasks.map((relatedTask) =>
                      relatedTask.completion_status !== "RESOLVED" ? (
                        <li key={relatedTask.id}>
                          <div className="flex justify-between items-center w-full">
                            {isEditing === relatedTask.id ? (
                              <TaskEdit
                                handleInputChange={handleInputChange}
                                handleDoneClick={handleDoneClick}
                                handleDeleteClick={handleDeleteClick}
                                task={task}
                              />
                            ) : (
                              <>
                                {fetchLoading.current === relatedTask.id ? (
                                  <Loading />
                                ) : (
                                  <TaskDisplay
                                    handleEditOnclick={handleEditOnclick}
                                    relatedTask={relatedTask}
                                    canEdit
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
                <div>
                  <h2>Resolved tasks:</h2>
                  <div className="flex justify-between items-center w-full">
                    <span className="w-3/5">Description</span>
                    <span className="w-1/3">Priority</span>
                    <span className="w-1/5">Status</span>
                  </div>
                  <ul>
                    {/* possibly refactor to sorting the tasks into different lists and making a new component to display them */}
                    {relatedTasks.map((relatedTask) =>
                      relatedTask.completion_status === "RESOLVED" ? (
                        <li key={relatedTask.id}>
                          <div className="flex justify-between items-center w-full">
                            {isEditing === relatedTask.id ? (
                              <TaskEdit
                                handleInputChange={handleInputChange}
                                handleDoneClick={handleDoneClick}
                                handleDeleteClick={handleDeleteClick}
                                task={task}
                              />
                            ) : (
                              <>
                                {fetchLoading.current === relatedTask.id ? (
                                  <Loading />
                                ) : (
                                  <TaskDisplay
                                    handleEditOnclick={handleEditOnclick}
                                    relatedTask={relatedTask}
                                    canEdit
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div>No tasks for this project yet</div>
            )}
          </div>
      )}
      </div>
    
  );
};

export default ProjectDetails;