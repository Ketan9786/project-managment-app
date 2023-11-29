import Search from "../Search";
import "./Navbar.css";
import AccountButton from "../AccountButton";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { Link } from "react-router-dom";
export default () => {

    const [login, setLogin] = useState(false);
    return (
        <div className="navbar-container">
            <img src="" alt="LOGO"></img>
            <Stack spacing={3} direction="row">
                <Button variant="contained" size="small"><Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>Project</Link></Button>
                <Button variant="contained" size="small"><Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>Task</Link></Button>
                <Button variant="contained" size="small"><Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>Users</Link></Button>
            </Stack>
            <div className="navbar-last-containt">
                <Search />
                {login ? (<AccountButton />) : (<Button variant="contained" size="small">Sign In</Button>)}
            </div>

        </div>
    )
}