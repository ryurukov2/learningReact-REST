import React from "react";
export function TaskDisplay({ handleEditOnclick, relatedTask, canEdit }) {
  return (
    <>
      <span className="w-3/5">{relatedTask.description}</span>
      <span className="w-1/5"> {relatedTask.priority}</span>
      <span className="w-1/5 text-center">{relatedTask.completion_status}</span>
      {canEdit &&
       <button
        className="btn-primary"
        onClick={() => handleEditOnclick(relatedTask)}
      >
        Edit
      </button>
}
    </>
  );
}
