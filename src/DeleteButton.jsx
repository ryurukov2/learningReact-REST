import React from "react";



const handleDelete = (id, handleProjectChange) => {
  const scrollPos = window.scrollY;
  sessionStorage.setItem('scrollPos', scrollPos.toString());

  let headers_to_use = {}
  try {
    const token = localStorage.getItem('authorizationToken')
    headers_to_use = {
      'Authorization': `Token ${token}`,
    }
    console.log(headers_to_use)
  } catch (error) {
    console.error(error)
  }
  fetch("https://radoslavy.pythonanywhere.com/api/projects/remove/" + id, {
    method: "DELETE",
    headers: headers_to_use,
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

  return <button className="btn-primary" onClick={() => handleDelete(projectId, handleProjectChange)}>Delete</button>;
}
