import React from "react";
export function Project({project}) {
  return (
    <div className="columns-2">
      {" "}
      <h2>{project.name}</h2>
      <p className="truncate">{project.description}</p>
    </div>
  );
}

//with memo, but not needed right now, nothing causes a re-render currently

// import React from "react";
// import {memo} from 'react';
// const Project = memo(function Project({project}) {
//   return (
//     <div className="columns-2">
//       {" "} 
//       <h2>{project.name}</h2>
//       <p className="truncate">{project.description}</p>
//     </div>
//   );
// })


// export default Project
