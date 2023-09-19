import { lazy } from "react";
import { TaskDisplay } from "./TaskDisplay";
import { TaskEdit } from "./TaskEdit";
import { Loading } from "../../components/Loading";
const AddTask = lazy(() => import("./AddTask.jsx"));
import { useState, useEffect, useRef, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Suspense } from "react";
import { LoggedInContext, BASE_URL } from "../../App";

const ProjectDetails = () => {
  const sortOrderOptions = [null, "desc", "asc"];
  const { id } = useParams();
  const [projectName, setProjectName] = useState([]);
  const [relatedTasks, setRelatedTasks] = useState([]);
  const [addTaskBtn, setAddTaskBtn] = useState(false);
  const [addAssigneeBtn, setAddAssigneeBtn] = useState(false);
  const [assigneeEmail, setAssigneeEmail] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const token = localStorage.getItem("authorizationToken");
  const isLoggedIn = useContext(LoggedInContext);
  const URL = useContext(BASE_URL);

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
    if (!relatedTasks.length == 0) {
      let sortedTasks = [...relatedTasks].sort(
        sortingFunctions[sortBy.current.attrib]
      );
      sortedTasks = orderFunctions[sortBy.current.ord](sortedTasks);

      setRelatedTasks(sortedTasks);
    }
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
  }, [relatedTasks.length]);

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
        <div className="flex flex-row gap-10">
          {/* <div className="grid grid-flow-col gap-10"> */}
          <div className="flex-grow">
            <div className="w-full flex flex-wrap">
              <div className="flex-grow">
                <h1 className="base-border">{projectName.name}</h1>
                <div className="base-border">
                  Description:
                  <div> {projectName.description}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h2>Tasks:</h2>
              <button className="btn-primary" onClick={toggleBtn}>
                Add New Task
              </button>
            </div>
            <div className="">
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
                    {relatedTasks.length > 0 &&
                      relatedTasks.map((relatedTask) =>
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
                    {relatedTasks.length > 0 &&
                      relatedTasks.map((relatedTask) =>
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
          <div className="base-border h-fit max-h-fit sticky top-4 text-right z-0">
            <div className="grid grid-cols-[min-content,1fr] place-content-center justify-items-start items-center gap-2 p-4 max-w-fit max-h-fit">
              {/* <div className="flex gap-2 justify-center place-items-center"> */}
              <div className="">Owner: </div>
              <div> Me</div>
              {/* </div> */}
              {/* <div className=""> */}
              {/* <div className="grid grid-col gap-2 justify-center place-items-center"> */}
              <div>Assigned:</div>
              <div className="justify-items-start text-left">
                <div className="">asd</div>
                <div>asd</div>
                <div>asd</div>
                <div>asdasd</div>
                {/* </div> */}
              </div>
            </div>
            <button
              className="btn-primary justify-self-end text-right"
              onClick={() => setAddAssigneeBtn(true)}
            >
              Add Assignee
            </button>
            <div className="">
              {addAssigneeBtn === true ? (
                <Suspense fallback={<Loading />}>
                  <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setAddAssigneeBtn(false)}
                  >
                    <div
                      className="relative rounded-2xl p-8 w-fit h-fit border-2 bg-gray-700 flex bg-opacity-100 justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          console.log(assigneeEmail)
                          let email = {user_email: assigneeEmail}
                          let headers_to_use = {
                            "Content-Type": "application/json",
                            Authorization: `Token ${token}`,
                          };
                          fetch(`${URL}/api/projects/${id}/add_assignee`, {
                            method: "PUT",
                            headers: headers_to_use,
                            body: JSON.stringify(email)
                          }).then(r => {console.log(r.detail)
                          if(r.status===200){
                            setAddAssigneeBtn(false)
                          }else{
                            return r.json()
                          }
                          }).then(data => {
                            console.log(data)
                            
                          }).catch(e => console.error(e));
                        }}
                      >
                        Asignee email:
                          <input type="text" name="asigneeEmail" onChange={(e) => {
                            setAssigneeEmail(e.target.value)
                          }} />
                        <button type="submit" className="btn-primary">
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </Suspense>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
