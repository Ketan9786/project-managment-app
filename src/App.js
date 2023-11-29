import React from 'react';
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
function App() {
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
