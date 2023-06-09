
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
        props.setToggleAdd(false) 
        // setName('');
        // setDescription('');
    }

    return (
        
        <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex items-center justify-center" onClick={e => props.setToggleAdd(false)}>
        <div className="relative rounded-2xl w-fit p-10 h-fit border-2 bg-gray-700 flex bg-opacity-100 justify-center" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
            <label className="">
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
            </label>
            <input className="btn-primary" type="submit" value="Add Project" />
        </form>
        </div>
        </div>
    );
}

export default AddProject;