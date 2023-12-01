import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import  { fetchProject } from "../../redux/slice/projectData";
import { fetchUsers } from "../../redux/slice/userData";
import MenuItem from '@mui/material/MenuItem';
import LogIn from '../LogIn';
import { useNavigate } from 'react-router-dom';
export default () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.userLogin);
    const projectData = useSelector((state) => state.projectData)
    const userData = useSelector((state) => state.userData);
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState({
        title: '',
        id: '',
        projectLead: '',
        taskInProject: 0,
        pendingTask: 0,
        resolved: 0,
        status: 'Live',
        tasks: []
    });

    React.useEffect(() => {
        dispatch(fetchProject())
        dispatch(fetchUsers())
    }, [])

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
        console.log(projectData)
        e.preventDefault();
    
        try {
          if (Array.isArray(projectData.data) && projectData.data.some) {
            const isProjectIdTaken = projectData.data.some((user) => user.id === projectDetails.id);
            if (isProjectIdTaken) {
              alert("ProjectId is already taken. Please choose another id.");
              return;
            }
            else {
                await axios.post('http://localhost:3001/projects', projectDetails);
              alert("Registration successful");
        
              setProjectDetails({
                title: '',
                id: '',
                projectLead: '',
                taskInProject: 0,
                pendingTask: 0,
                resolved: 0,
                status: 'Live',
                tasks: []
            });
    
              navigate("/dashboard");
            } 
          } 
          }
          catch (error) {
            console.error("Error during registration:", error);
          }
         
      };
    

    return (<>
        {data.isLoggedIn ?(<Container>
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
                    select
                   
                >
                {/* <select value={projectDetails.projectLead} name='assignee' style={{width:"100%",height:"50px"}} onChange={handleInputChange}> */}
         \
                {userData.data && userData.data.map((option) => (
                    <MenuItem key={option._id} value={option.fullName} >
                        {option.fullName}
                    </MenuItem>
                ))}
          \
                
            {/* </select> */}
            </TextField>
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
        </Container>):(<LogIn/>)}
    </>
        
    );
};

