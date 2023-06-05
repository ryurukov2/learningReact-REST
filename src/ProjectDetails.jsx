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

  return (
    <div>
      <div>
        <h1>{projectName.name}</h1>
        <p>Description: {projectName.description}</p>
        <h2>Tasks:</h2>
        <ul>
          {relatedTasks.map((relatedTask) => (
            <li key={relatedTask.id}>
              <div className="flex justify-between items-center w-full">
                {isEditing === relatedTask.id ? (
                  <>
                    <input
                      type="text"
                      name="description"
                      value={task.description}
                      onChange={handleInputChange}
                    />
                  
                    <select
                      name="priority"
                      value={task.priority}
                      onChange={handleInputChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  
                    <select
                      name="completion_status"
                      value={task.completion_status}
                      onChange={handleInputChange}
                    >
                      <option value="TODO">TODO</option>
                      <option value="INPROGRESS">IN PROGRESS</option>
                      <option value="ONHOLD">ON HOLD</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        handleDoneClick();
                      }}
                    >
                      Done
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => handleDeleteClick()}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    {fetchLoading.current === relatedTask.id ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <span>{relatedTask.description}</span>
                        <span> {relatedTask.priority}</span>
                        <span> {relatedTask.completion_status}</span>
                        <button
                          className="btn-primary"
                          onClick={() => handleEditOnclick(relatedTask)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <button className="btn-primary"  onClick={toggleBtn}>
          Add New Task
        </button>
      </div>
      <div>
        {addTaskBtn === true ? (
          <AddTask
            id={id}
            addTaskToList={addTaskToList}
            toggleBtn={toggleBtn}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProjectDetails;
