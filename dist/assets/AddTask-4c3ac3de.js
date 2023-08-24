import{r as o,j as e}from"./index-7c20436a.js";function m({id:l,addTaskToList:c,toggleBtn:n}){const[s,d]=o.useState(""),a=o.useRef(1),p=localStorage.getItem("authorizationToken"),h=r=>{r.preventDefault();const u={project:l,description:s,priority:a.current};let x={"Content-Type":"application/json",Authorization:`Token ${p}`};fetch("https://radoslavy.pythonanywhere.com/api/projects/tasks/add",{method:"POST",headers:x,body:JSON.stringify(u)}).then(t=>{if(t.status===201)return t;throw Error(`Status - ${response.status}`)}).then(t=>t.json()).then(t=>{c(t),n()}).catch(t=>{console.error("Error:",t)})},i=r=>{a.current=r.target.value};return e.jsx("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-80 flex items-center justify-center",onClick:n,children:e.jsx("div",{className:"relative rounded-2xl p-8 w-fit h-fit border-2 bg-gray-700 flex bg-opacity-100 justify-center",onClick:r=>r.stopPropagation(),children:e.jsxs("form",{onSubmit:h,className:" flex items-center ",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Description"}),e.jsx("input",{type:"text",name:"description",value:s,onChange:r=>d(r.target.value),required:!0})]}),e.jsxs("div",{children:[e.jsx("h2",{children:"Priority"}),e.jsxs("label",{htmlFor:"1",children:[" ",e.jsx("input",{type:"radio",name:"priority",value:"1",id:"1",onChange:i})," ","Minor (1)"]}),e.jsx("br",{}),e.jsxs("label",{htmlFor:"2",children:[e.jsx("input",{type:"radio",name:"priority",value:"2",id:"2",onChange:i})," ","Can wait (2) "]}),e.jsx("br",{}),e.jsxs("label",{htmlFor:"3",children:[e.jsx("input",{type:"radio",name:"priority",value:"3",id:"3",onChange:i})," ","Important (3)"]})," ",e.jsx("br",{}),e.jsxs("label",{htmlFor:"4",children:[e.jsx("input",{type:"radio",name:"priority",value:"4",id:"4",onChange:i})," ","Urgent (4)"]})," ",e.jsx("br",{}),e.jsxs("label",{htmlFor:"5",children:[e.jsx("input",{type:"radio",name:"priority",value:"5",id:"5",onChange:i})," ","Vital (5)"]})]}),e.jsx("input",{className:"btn-primary",type:"submit",value:"Add Task"})]})})})}export{m as default};
