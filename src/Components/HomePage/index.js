import { Button, Typography } from "@mui/material";
import { useState } from "react"
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import "./HomePage.css"
import LogIn from "../LogIn";
import { useSelector } from 'react-redux';
export default () => {
    const data = useSelector((state) => state.userLogin);
    return (
        <>
            {data.isLoggedIn ? (<Dashboard />) :
                (<LogIn />)
            }
        </>)





}