const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    title:String,
    id:String,
    projectLead:String,
    taskInProject:Number,
    pendingTask:Number,
    resolved:Number,
    status:String,
    tasks:Array
})

const ProjectModel = mongoose.model("registerprojects",ProjectSchema)
module.exports =ProjectModel;