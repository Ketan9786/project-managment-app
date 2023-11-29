import { Button, Typography } from "@mui/material";
import { useState } from "react"
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import "./HomePage.css"

export default () => {
    const [login, setLogin] = useState(true);
    return (
        <>
            {login ? (<Dashboard/>) :
                (
                    <div className="homePage">
                        <Typography>Please login to manage project && Task</Typography>
                        <Button><Link to="/login">LogIn</Link></Button>
                    </div>


                )
            }</>
    )
}