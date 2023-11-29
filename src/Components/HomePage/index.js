import { Button, Typography } from "@mui/material";
import { useState } from "react"
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import "./HomePage.css"

export default () => {
    const [login, setLogin] = useState(false);
    return (
        <>
            {login ? (<Dashboard/>) :
                (
                    <div className="homePage">
                        <Typography variant="h4" component="h4">Please login to manage project && Task</Typography>
                        <Link to="/login">  <Button variant="contained" >LogIn</Button></Link>
                    </div>


                )
            }</>
    )
}