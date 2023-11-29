import { Button, Typography } from "@mui/material";
import { useState } from "react"
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import "./HomePage.css"
import LogIn from "../LogIn";
export default () => {
    const [login, setLogin] = useState(false);
    return (
        <>
            {login ? (<Dashboard />) :
                (
                    <LogIn />


                )
            }</>
    )
}