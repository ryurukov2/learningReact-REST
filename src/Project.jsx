import React from "react";
export function Project({project}) {
  return (
    <div className="columns-2">
      {" "}
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
}
