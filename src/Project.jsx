const Project = ({ project, onDelete, preChange }) => {
  const handleDelete = () => {
    console.log(window.pageYOffset);
    preChange();
    console.log("from handle delete 1");
    fetch("http://localhost:8000/api/projects/remove/" + project.id, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        console.log(response.status + " from first handle delete then");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        onDelete();
      });
  };

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Project;
