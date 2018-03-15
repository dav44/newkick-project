const mongoose = require('mongoose');
const config = require('../config/database');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    subtitle: {
        type: String,
        require: true
    },
    createdBy: {
        type: String,
        require: true
    },
    
    category: {
        type: String,
        require: true
    },
    projectImage: {
        type: String,
        require: true
    },
    about: {
        type: String,
        require: true
    },

    foundingGoal: {
        type: Number,
        require: true
    },
    backers: { 
        type: Number,
        default: 0
    },

    foundingDuration: {
        type: Number,
        require: true
    }
});

const Project = module.exports = mongoose.model('Project', projectSchema);

module.exports.getProjectById = function(id, callback){
    Project.findById(id, callback);
}

module.exports.addProject = function(newProject, callback) {
    newProject.save(callback);
}