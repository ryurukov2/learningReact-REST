
import { useState } from "react";
const AddProject = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const project = {
            name: name,
            description: description
        };

        fetch('http://localhost:8000/api/projects/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            props.onNewProject();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // setName('');
        // setDescription('');
    }

    return (
        <form onSubmit={onSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
            </label>
            <input className="btn-primary" type="submit" value="Add Project" />
        </form>
    );
}

export default AddProject;