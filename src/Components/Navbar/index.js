import Search from "../Search";
import "./Navbar.css";
import AccountButton from "../AccountButton";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [login, setLogin] = useState(false);

    const linkStyle = { textDecoration: "none", color: "white" };

    return (
        <div className="navbar-container">
           <Link to="/"> <img src="" alt="Company Logo"></img></Link>
            <Stack spacing={3} direction="row">
                <Link to="/dashboard" style={linkStyle}><Button variant="contained" size="small">Project</Button></Link>
                <Link to="/dashboard" style={linkStyle}><Button variant="contained" size="small">Task</Button></Link>
                <Link to="/dashboard" style={linkStyle}><Button variant="contained" size="small">Users</Button></Link>
            </Stack>
            <div className="navbar-last-containt">
                <Search />
                {login ? <AccountButton /> : <Link to="/signin"><Button variant="contained" size="small">Sign In</Button></Link>}
            </div>
        </div>
    );
}

export default Navbar;
