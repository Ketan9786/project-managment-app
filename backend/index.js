const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UsersModel = require("./models/Users");
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());
app.use(cors());

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
                    res.json("Sucess")
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

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
