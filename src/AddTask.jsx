import React, { useRef } from "react";
import { useState } from "react";
export function AddTask({ id, addTaskToList, toggleBtn }) {
  const [description, setDescription] = useState("");
  const taskPriority = useRef(1);
  const handleSubmit = (event) => {
    event.preventDefault();

    const task = {
      project: id,
      description: description,
      priority: taskPriority.current,
    };

    fetch("http://localhost:8000/api/projects/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((r) => {
        if (r.status === 201) {
          return r;
        }
      })
      .then((r) => r.json())
      .then((data) => {
        addTaskToList(data);
        toggleBtn();
      });
  };

  const onOptionChange = (e) => {
    taskPriority.current = e.target.value;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex items-center justify-center" onClick={toggleBtn}> 
    <div className="relative w-fit h-fit border-2 bg-gray-700 flex bg-opacity-100 justify-center" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className=" flex items-center ">
        <div>
        <h2>Description</h2>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        </div>
        <div>
        <h2>Priority</h2>
          <input
            type="radio"
            name="priority"
            value="1"
            id=""
            onChange={onOptionChange}
          />{" "}
          Minor (1) <br />
          <input
            type="radio"
            name="priority"
            value="2"
            id=""
            onChange={onOptionChange}
          />{" "}
          Can wait (2) <br />
          <input
            type="radio"
            name="priority"
            value="3"
            id=""
            onChange={onOptionChange}
          />{" "}
          Important (3) <br />
          <input
            type="radio"
            name="priority"
            value="4"
            id=""
            onChange={onOptionChange}
          />{" "}
          Urgent (4) <br />
          <input
            type="radio"
            name="priority"
            value="5"
            id=""
            onChange={onOptionChange}
          />{" "}
          Vital (5)
        </div>
        <input className="btn-primary" type="submit" value="Add Task" />
      </form>
      </div>
    </div>
  );
}
