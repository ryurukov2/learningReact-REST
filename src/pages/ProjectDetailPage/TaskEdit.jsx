import React from "react";
export function TaskEdit({
  handleInputChange,
  handleDoneClick,
  handleDeleteClick,
  task
}) {
  return (
    <>
      <textarea
        className="w-2/4"
        rows={Math.ceil(task.description.length / 50)}
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
        Save
      </button>
      <button className="btn-primary" onClick={() => handleDeleteClick()}>
        Delete
      </button>
    </>
  );
}
