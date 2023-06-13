import React from "react";
import { Link } from "react-router-dom";
export function Navbar({}) {
  return (
    <div className="flex justify-center my-4">
      <div className="w-9/12 flex justify-between">
        <Link className="nav-btn" to={`/`}>
          Home
        </Link>

        <Link className="nav-btn" to={`/projects`}>
          Projects
        </Link>
      </div>
    </div>
  );
}
