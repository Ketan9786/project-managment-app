import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Open', 'In Progress', 'Pending', 'Resolved'];

export default () => {
    const [projects, setProjects] = useState(['Ketan','Kulkarni']);
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        id: '',
        projectName:'',
        assignee: '',
        deadline: '',
        priority: 'High',
        description: '',
        status: 'Open',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', taskDetails);
    };

    return (
        <Container>


            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={taskDetails.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="ID"
                    name="id"
                    value={taskDetails.id}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                 <TextField
                    label="projects"
                    select
                    name="projectName"
                    value={taskDetails.projectName}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    required
                >
                    {projects.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Assignee"
                    name="assignee"
                    value={taskDetails.assignee}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Deadline"
                    type="date"
                    name="deadline"
                    value={taskDetails.deadline}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Priority"
                    select
                    name="priority"
                    value={taskDetails.priority}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                >
                    {priorities.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Description"
                    name="description"
                    value={taskDetails.description}
                    onChange={handleChange}
                    multiline
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Status"
                    select
                    name="status"
                    value={taskDetails.status}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    required
                >
                    {statuses.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Container>
    );
};


