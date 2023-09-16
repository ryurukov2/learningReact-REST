import {useContext} from "react";
import {  BASE_URL } from "./App";



export function DeleteButton({  projectId, handleProjectChange}) {
  const URL = useContext(BASE_URL) 
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
    fetch(`${URL}/api/projects/remove/` + id, {
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
  return <button className="btn-primary" onClick={() => handleDelete(projectId, handleProjectChange)}>Delete</button>;
}
