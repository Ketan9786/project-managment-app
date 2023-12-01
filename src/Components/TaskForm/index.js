import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProject } from "../../redux/slice/projectData";
import { fetchUsers } from "../../redux/slice/userData";
import LogIn from '../LogIn';
import axios from 'axios';
const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Open', 'In Progress', 'Pending', 'Resolved'];

export default () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.projectData);
    const userData = useSelector((state) => state.userData);
    // const [projects, setProjects] =  useState(data.data.map(project => project.title));
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        id: '',
        projectName: '',
        assignee: '',
        deadline: '',
        priority: 'High',
        description: '',
        status: 'Open',
    });

    React.useEffect(() => {
        dispatch(fetchProject())
        dispatch(fetchUsers())
    }, [])
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(taskDetails);
        try {
            
            const projectId = e.target._id;
            
            
            const apiUrl = `http://localhost:3000/projects/${projectId}`;
            
            // Make a PUT request to update the project
            const response = await axios.put(apiUrl, taskDetails);
            
            console.log('Project updated:', response.data);
        } catch (error) {
            console.error('Error updating project:', error.response ? error.response.data : error.message);
        }
    };
    
    return (<>{data.isLoggedIn ? (<Container>


        <form onSubmit={handleSubmit} id={data.data._id}>
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
            <select name='projectName' value={taskDetails.projectName} style={{width:"100%",height:"50px" ,marginBottom:"20px",borderColor:"gray"}} onChange={handleChange}>
                { data.data && data.data.map((option) => (
                    <option key={option._id} value={option.title}>
                        {option.title}
                    </option>
                ))}
            </select>
            <select value={taskDetails.assignee} name='assignee' style={{width:"100%",height:"50px"}} onChange={handleChange}>
                {userData.data && userData.data.map((option) => (
                    <option key={option._id} value={option.fullName}>
                        {option.fullName}
                    </option>
                ))}
            </select>
            <TextField
                label="Deadline"
                type="date"
                name="deadline"
                value={taskDetails.deadline}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"Aj
                InputLabelProps={{
                    shrink: true,
                }}
            />

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
                value={taskDetails.priority}
                onChange={handleChange}
                margin="normal"
                fullWidth
                required
            >
                {priorities.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
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
    </Container>) : (<LogIn />)}</>

    );
};


