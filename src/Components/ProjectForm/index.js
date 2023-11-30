import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import axios from 'axios';
export default () => {

    const [projectDetails, setProjectDetails] = useState({
        title: '',
        id: '',
        projectLead: '',
        taskInProject: 0,
        pendingTask: 0,
        resolved: 0,
        status: 'Live',
        tasks: [{ Ketan: "Kulkarni" }]
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        if (name === 'title') {
            const titleWords = value.split(' ');
            let projectId = '';

            if (titleWords.length >= 2) {
                projectId = `${titleWords[0][0].toUpperCase()}${titleWords[1].slice(0, 2).toUpperCase()}`;
            } else {
                projectId = "Please enter at least 3 words of project name"
            }

            setProjectDetails((prevDetails) => ({
                ...prevDetails,
                id: projectId,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('http://localhost:3001/projects', projectDetails);
            console.log('Form submitted with data:', projectDetails);
    
            setProjectDetails({
                title: '',
                id: '',
                projectLead: '',
                taskInProject: 0,
                pendingTask: 0,
                resolved: 0,
                status: 'Live',
                tasks: [{ Ketan: "Kulkarni" }]
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={projectDetails.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="ID"
                    name="id"
                    value={projectDetails.id}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required

                />
                <TextField
                    label="Project Lead"
                    name="projectLead"
                    value={projectDetails.projectLead}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                   
                />
                <TextField
                    label="Task in Project"
                    name="taskInProject"
                    type="number"
                    value={projectDetails.taskInProject}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    disabled
                />
                <TextField
                    label="Pending Task"
                    name="pendingTask"
                    type="number"
                    value={projectDetails.pendingTask}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    disabled
                  
                />
                <TextField
                    label="Resolved"
                    name="resolved"
                    type="number"
                    value={projectDetails.resolved}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    disabled
                />
                <TextField
                    label="Status"
                    name="status"
                    value={projectDetails.status}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    disabled
                   
                />
                <Button variant="contained" color="primary" type="submit">
                    Create Project
                </Button>
            </form>
        </Container>
    );
};

