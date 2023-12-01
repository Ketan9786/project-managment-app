import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LogIn from './Components/LogIn';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Project from "./Components/Project";
import ProjectForm from "./Components/ProjectForm";
import Task from "./Components/Task";
import TaskForm from "./Components/TaskForm";
import User from "./Components/User";
import SignIn from "./Components/SignIn";
import Dashboard from './Components/Dashboard';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/slice/userSlice';
function App() {
  const dispatch = useDispatch();
  const storedToken = Cookies.get('token');
  // const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);
  // const token = useSelector((state) => state.userLogin.token);

  dispatch(loginUser(storedToken));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/project" element={<Project />} />
        <Route path="/projectform" element={<ProjectForm />} />
        <Route path="/task" element={<Task />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/user" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
