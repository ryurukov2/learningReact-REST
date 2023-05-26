import React from "react";
export function DeleteButton({
  handleDelete, projectId
}) {
  return <button onClick={() => handleDelete(projectId)}>Delete</button>;
}
  