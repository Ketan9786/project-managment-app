import { Button, Container, Stack, Typography } from "@mui/material";
import Search from "../Search";
import { Link } from "react-router-dom";
import Tabel from "../Tabel";
import TabelTask from "../TabelTask";
import { useState } from "react";
import Login from "../LogIn";
import { useSelector } from 'react-redux';
export default () => {
 
    const [currentView, setCurrentView] = useState("user");
    const data = useSelector((state) => state.userLogin);
  
    
    return (<Container>
        {
            data.isLoggedIn ? (<>

                <Stack direction="column">
                    <Typography variant="h5" component="h5">
                        Total {(currentView == "project" || currentView == "user") ? "Project" : "Task"} : 22
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                        <Search />
                        <Link to={(currentView == "project" || currentView == "user") ? "/projectform" : "/taskform"}> <Button variant="contained">Create New {(currentView == "project" || currentView == "user") ? "project" : "Task"} </Button></Link>


                    </Stack>
                    <Typography component="div" sx={{ marginTop: "30px" }}></Typography>
                    {(currentView == "project" || currentView == "user") ? <Tabel/> : <TabelTask />}
                </Stack>

            </>) : (<Login/>)
        }

    </Container>)
}