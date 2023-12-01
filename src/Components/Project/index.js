import { Button, Container, Stack, TextField, Typography } from "@mui/material"
import TabelTask from "../TabelTask";
import LogIn from "../LogIn";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";

export default () => {
    const data = useSelector((state) => state.userLogin);
    const location = useLocation();
    const navigate = useNavigate();
    const projectData = location.state?.projectData;
    const [isEditing, setIsEditing] = useState(false)
    const [editedProjectData, setEditedProjectData] = useState({
        title: projectData.title,
        id: projectData.id,
        projectLead: projectData.projectLead,
        taskInProject: projectData.taskInProject,
        pendingTask: projectData.pendingTask,
        resolved: projectData.resolved,
        status: projectData.status,
        tasks: projectData.tasks
    });
    const handelEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProjectData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
      
    };
    
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const handleSaveClick = async () => {
    
        try {
            const response = await fetch(`http://localhost:3001/projects/${projectData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProjectData),
            });

            if (response.ok) {
                console.log('Project updated successfully:', editedProjectData);
                setIsEditing(!isEditing);
            } else {
                const errorData = await response.json();
                console.error('Failed to update project details:', errorData);
            }
        } catch (error) {
            console.error('Error updating project details:', error);
        }
      
    };

    return (<>{data.isLoggedIn ? (<Container>
        <Stack>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" component="div">
                    {isEditing ? (<TextField label="Project Name" name="title" defaultValue={projectData.title} fullWidth onChange={handelEditChange} ></TextField>) : (projectData.title)}
                </Typography>
                <Typography variant="h5" component="div">
                    {isEditing ? (<TextField label="Project Key" name="id" defaultValue={projectData.id} fullWidth onChange={handelEditChange} ></TextField>) : (projectData.id)}
                </Typography>
                {isEditing?(<Button variant="contained" onClick={handleSaveClick}>Save</Button>):(<Button variant="contained" onClick={handleEditClick}>Edit</Button>)}
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                <Stack direction="column" sx={{ gap: "15px" }}>
                    <Typography variant="h5" component="div">
                        Task in Tasks :{projectData.taskInProject}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Pending Task :{projectData.pendingTask}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Resolved Task :{projectData.resolved}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Project Status :{projectData.status}
                    </Typography>
                </Stack>

                <Link to="/taskform"><Button variant="contained">New Task
                </Button></Link>
            </Stack>


            <TabelTask pData={editedProjectData} />
        </Stack>
    </Container>) : (<LogIn />)}</>)

}


