import React from "react";



const handleDelete = (id, handleProjectChange) => {
  const scrollPos = window.scrollY;
  sessionStorage.setItem('scrollPos', scrollPos.toString());
  fetch("http://localhost:8000/api/projects/remove/" + id, {
    method: "DELETE",
  })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      // window.scrollTo(0, sessionStorage.getItem("scrollPos"));
      handleProjectChange();
    });
};
export function DeleteButton({  projectId, handleProjectChange}) {

  return <button className="btn-delete" onClick={() => handleDelete(projectId, handleProjectChange)}>Delete</button>;
}
