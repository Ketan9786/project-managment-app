const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UsersModel = require("./models/Users");
const ProjectModel = require("./models/Project");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/login', (req, res) => {
    const { email, password } = req.body; 

    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
               bcrypt.compare(password,user.password,(err,response)=>{
                if(err){
                    res.json("password is incorrect")
                }
                if(response){
                    const token= jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"1d"})
                    res.cookie("token",token);
                    res.json("Sucess");
                }
               })
            } else {
                res.json("No record found, please register");
            }
        })
        .catch(err => res.status(500).json(err)); 
});

app.post('/register', (req, res) => {
    const {fullName,password,email,mobileNumber,birthDate,gender}=req.body;
    bcrypt.hash(password,10)
    .then(hash=>{
        UsersModel.create({fullName, password:hash ,email,mobileNumber,birthDate,gender})
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));
    })
     
});

app.post('/projects', (req, res) => {
    ProjectModel.create(req.body)
    .then(project => res.json(project))
    .catch(err => res.status(500).json(err)); 
});

app.get('/users', (req, res) => {
    
    UsersModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
});

app.get('/projects', (req, res) => {
    
    ProjectModel.find({})
        .then(projects => res.json(projects))
        .catch(err => res.status(500).json(err));
});
app.get('/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    ProjectModel.findById(projectId)
        .then(project => {
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.json(project);
        })
        .catch(err => res.status(500).json(err));
});
app.put('/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const updatedProjectData = req.body;
    console.log(projectId, updatedProjectData);

    ProjectModel.findByIdAndUpdate(projectId, updatedProjectData, { new: true })
        .then(updatedProject => {
            if (!updatedProject) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.json(updatedProject);
        })
        .catch(err => res.status(500).json(err));
});
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});