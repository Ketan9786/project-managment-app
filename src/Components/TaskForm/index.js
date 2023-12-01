import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material';
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
    const [projectID, setProjectID] = useState();
    const [taskID, setTaskID] = useState("");
    const [newProjectData, setNewProjectData] = useState();
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

        if (projectID) {
            const fetchData = async () => {
                const projectResponse = await axios.get(`http://localhost:3001/projects/${projectID}`);
                const projectById = projectResponse.data;
                setNewProjectData(projectById);
                const taskid= projectById.id + (projectById.tasks.length + 1);
                setTaskID(taskid)
            }
            fetchData();
        }

    }, [projectID])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
            id:taskID
        }));

    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        
      
        const updatedProjectData = {
            ...newProjectData,
            tasks: Array.isArray(newProjectData.tasks)
                ? [...newProjectData.tasks, taskDetails]
                : [taskDetails]
        };
        try {
            const response = await fetch(`http://localhost:3001/projects/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProjectData),
            });

            if (response.ok) {
                console.log('Task Updated successfully:');
                setTaskDetails({
                    title: '',
                    id: '',
                    projectName: '',
                    assignee: '',
                    deadline: '',
                    priority: 'High',
                    description: '',
                    status: 'Open',
                })
                setProjectID();

            } else {
                const errorData = await response.json();
                console.error('Failed to update project details:', errorData);
            }
        } catch (error) {
            console.error('Error updating project details:', error);
        }


    };


    return (<>{data.isLoggedIn ? (<Container>


        <form onSubmit={handleSubmit} >
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
                required
                margin="normal"
                disabled
            />


            <TextField
                label="Project Name"
                name="projectName"
                value={taskDetails.projectName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                select
                required
            >


                {/* <select name='projectName' defaultValue="{taskDetails.projectName}" style={{width:"100%",height:"50px" ,marginBottom:"20px",borderColor:"gray"}} onChange={handleChange} onClick={(e)=> console.log(e.target.value)} > */}
                \
                {data.data && data.data.map((option,idx) => (
                    <MenuItem key={option._id} value={option.title} id={option._id} onClick={(e) => { 
                        setProjectID(e.target.id) 
                        setTaskID(taskID);
                        
                        }} >
                        {option.title}
                    </MenuItem>
                ))}
                \
                {/* </select> */}
            </TextField>

            <TextField
                label="Assignee Name"
                name="assignee"
                value={taskDetails.assignee}
                onChange={handleChange}
                fullWidth
                margin="normal"
                select
                required
            >

                {/* <select value={taskDetails.assignee} name='assignee' style={{width:"100%",height:"50px"}} onChange={handleChange}> */}
                \
                {userData.data && userData.data.map((option) => (
                    <MenuItem key={option._id} value={option.fullName}>
                        {option.fullName}
                    </MenuItem>
                ))}
                \
                {/* </select> */}
            </TextField>
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
                label="Priority"
                select
                name="priority"
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


