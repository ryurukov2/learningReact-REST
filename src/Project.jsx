import React from "react";
export function Project({project}) {
  return (
    <>
      {" "}
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </>
  );
}
