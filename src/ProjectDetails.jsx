import { TaskDisplay } from "./TaskDisplay";
import { TaskEdit } from "./TaskEdit";
import { Loading } from "./Loading";
import { AddTask } from "./AddTask";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const deleteFetch = async (task) => {
  const r = await fetch(`http://localhost:8000/api/task/${task.id}/remove`, {
    method: "DELETE",
  }).catch((er) => console.log(er));
  return r;
};

const updateFetch = async (
  id,
  updatedTask,
  relatedTasks,
  setRelatedTasks,
  fetchLoading
) => {
  fetch(`http://localhost:8000/api/task/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
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
const dataFetch = async (id, setProjectName, setRelatedTasks) => {
  fetch(`http://localhost:8000/api/projects/${id}/`)
    .then((r) => r.json())
    .then((r) => {
      setProjectName(r);
    });
  fetch(`http://localhost:8000/api/projects/${id}/tasks/`)
    .then((r) => r.json())
    .then((r) => {
      setRelatedTasks(r);
    })
    .catch((er) => console.log(er));
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [projectName, setProjectName] = useState([]);
  const [relatedTasks, setRelatedTasks] = useState([]);
  const [addTaskBtn, setAddTaskBtn] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [task, setTask] = useState({
    id: "",
    description: "",
    priority: "",
    completion_status: "",
  });
  const fetchLoading = useRef(null);
  const sortBy = useRef({
    attrib: "id",
    ord: null,
  });

  const handleDeleteClick = () => {
    deleteFetch(task)
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
    updateFetch(id, task, relatedTasks, setRelatedTasks, fetchLoading);
  };

  const toggleBtn = () => {
    setAddTaskBtn(!addTaskBtn);
  };
  const addTaskToList = (newTask) => {
    setRelatedTasks([...relatedTasks, newTask]);
  };

  useEffect(() => {
    dataFetch(id, setProjectName, setRelatedTasks);
  }, []);

  const sortFunc = (property) => {
    const t = [...relatedTasks];
    console.log(sortBy);
    t.sort((a, b) =>
      a[property] > b[property]
        ? -1
        : a[property] === b[property]
        ? a.description.length > b.description.length
          ? -1
          : 1
        : 1
    );
    console.log(t);
    setRelatedTasks(t);
  };

  return (
    <div className="relative">
      <div>
        <h1 className="rounded-md border-2 border-slate-500 text-center overflow-clip break-words">
          {projectName.name}
        </h1>
        <p className="rounded-md border-2 border-slate-500 text-center overflow-clip break-words">
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
            <AddTask
              id={id}
              addTaskToList={addTaskToList}
              toggleBtn={toggleBtn}
            />
          ) : null}
        </div>
        <br />
        <div className="flex justify-between items-center w-full">
          <span className="w-3/5" onClick={() => sortFunc()}>
            Description
          </span>
          <span className="w-1/3" onClick={() => sortFunc("priority")}>
            Priority
          </span>
          <span className="w-1/5">Status</span>
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
    </div>
  );
};

export default ProjectDetails;
