import React, { useRef } from "react";
import { useState } from "react";
export function AddTask({ id, addTaskToList, toggleBtn }) {
  const [description, setDescription] = useState("");
  //   const [priority, setPriority] = useState(1)
  const taskPriority = useRef(1);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(priority)

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
    // setPriority(e.target.value)
    taskPriority.current = e.target.value;
  };

  return (
    <div>
      asdasd
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <h2>Priority</h2>
        <div>
          <input
            type="radio"
            name="priority"
            value="1"
            id=""
            onChange={onOptionChange}
          />{" "}
          Minor (1)
          <input
            type="radio"
            name="priority"
            value="2"
            id=""
            onChange={onOptionChange}
          />{" "}
          Can wait (2)
          <input
            type="radio"
            name="priority"
            value="3"
            id=""
            onChange={onOptionChange}
          />{" "}
          Important (3)
          <input
            type="radio"
            name="priority"
            value="4"
            id=""
            onChange={onOptionChange}
          />{" "}
          Urgent (4)
          <input
            type="radio"
            name="priority"
            value="5"
            id=""
            onChange={onOptionChange}
          />{" "}
          Vital (5)
        </div>
        <input type="submit" value="Add Task" />
      </form>
    </div>
  );
}
