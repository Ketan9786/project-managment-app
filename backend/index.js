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
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password is incorrect");
                }
            } else {
                res.json("No record found, please register");
            }
        })
        .catch(err => res.status(500).json(err)); // Handle errors properly
});

app.post('/register', (req, res) => {
    
    UsersModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err)); // Handle errors properly
});

const PORT = process.env.PORT || 3001; // Use the environment port or default to 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
