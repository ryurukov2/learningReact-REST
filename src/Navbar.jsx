import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { LoginModal } from "./LoginModal";
export function Navbar({}) {
  const [loginModalClicked, setLoginModalClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authToken = useRef('')
  useEffect(() => {
    try{
      const token = localStorage.getItem("authorizationToken")
      if(token){
        authToken.current = token
        setIsLoggedIn(true)
      }
    }catch(e){
      console.error(e)
    }
  }, [isLoggedIn])
  const handleLogout = () => {
    console.log(authToken.current)

    fetch(`http://localhost:8000/auth/logout/`, {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Token ${authToken.current}`,
      }
    }).then(r => {
      if(r.status === 200){
        localStorage.removeItem('authorizationToken')
        setIsLoggedIn(false)
      }
    }).catch(e => {
      console.error(e)
    })


  }
  return (
    <>
      <div className="flex justify-between my-4 px-4 sm:px-6 lg:px-8">
        <div></div>
        <div className="flex justify-center">
          <Link className="nav-btn mx-2" to={`/`}>
            Home
          </Link>
          <Link className="nav-btn mx-2" to={`/projects`}>
            Projects
          </Link>
        </div>
        <div>
          {!isLoggedIn ? 
          <button
            onClick={() => setLoginModalClicked(!loginModalClicked)}
            className="btn-primary"
          >
            Login
          </button>
          : <button onClick={() => handleLogout()}
          className="btn-primary">
            Logout
          </button>
}
          {loginModalClicked &&
            createPortal(
              <LoginModal setLoginModalClicked={setLoginModalClicked} setIsLoggedIn={setIsLoggedIn} />,
              document.body
            )}
        </div>
      </div>
    </>
  );
}

