import { useState, useEffect, useRef } from "react";

import "./styles.css";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";
import PageButtons from "./PageButtons";
export default function App() {
  // const [todos, setTodos] = useState([]);

  // function addTodo(title) {
  //   setTodos((currentTodos) => {
  //     return [
  //       ...currentTodos,
  //       { id: crypto.randomUUID(), title, completed: false },
  //     ];
  //   });
  // }

  // function toggleTodo(id, completed) {
  //   setTodos((currentTodos) => {
  //     return currentTodos.map((todo) => {
  //       if (todo.id === id) {
  //         return { ...todo, completed };
  //       }
  //       return todo;
  //     });
  //   });
  // }

  // function deleteTodo(id) {
  //   setTodos((currentTodos) => {
  //     return currentTodos.filter((todo) => todo.id !== id);
  //   });
  // }

  // console.log(todos);
  // return (
  //   <>
  //     <NewTodoForm addTodo={addTodo} />

  //     <h1 className="header">List</h1>
  //     <ul className="list">
  //       {todos.length === 0 && "No entries"}
  //       {todos.map((todo) => {
  //         return (
  //           <li key={todo.id}>
  //             <label>
  //               <input
  //                 type="checkbox"
  //                 checked={todo.completed}
  //                 onChange={(e) => toggleTodo(todo.id, e.target.checked)}
  //               />
  //               {todo.title}
  //             </label>
  //             <button
  //               className="btn btn-danger"
  //               onClick={() => deleteTodo(todo.id)}
  //             >
  //               Delete
  //             </button>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </>
  // );
  const [projects, setProjects] = useState([]);
  const scrollPosition = useRef(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async () => {
    const response = await fetch(`http://localhost:8000/api/projects/list?page=${currentPage}`);
    const data = await response.json();
    // console.log(data.count);
    setProjects(data.results);
    setPages(Math.ceil(data.count / 10));
    window.scrollTo(0, scrollPosition.current);
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const preChangeSteps = () => {
    scrollPosition.current = window.scrollY;
  };
  const handleProjectChange = () => {
    fetchProjects();
  };

  return (
    <div>
      <h1>Projects</h1>
      <AddProject onNewProject={handleProjectChange} />
      <PageButtons currentPage={currentPage} numPages={pages} setCurrentPage={setCurrentPage} preChange={preChangeSteps} />
      <ProjectList
        projects={projects}
        preChange={preChangeSteps}
        onProjectDelete={handleProjectChange}
      />
      <PageButtons currentPage={currentPage} numPages={pages} setCurrentPage={setCurrentPage} preChange={preChangeSteps} />
      
      
      </div>
  );
}
