const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config =require('../config/database');
const project = require('../models/project');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cd (null, './uploads/');
    },
    filename: function(req, file, cd) {
        cb (null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb (null, true);
} else {
    cb (null, false);
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});


router.post('/newProject', upload.single('projectImage'), (req, res, next) => {
    let newProject = new project({
        title: req.body.title,
        subtitle: req.body.subtitle,
        createdBy: req.body.createdBy,
        category: req.body.category,
        projectImage: req.file.path,
        about: req.body.about,
        foundingGoal: req.body.foundingGoal,
        backers: req.body.backers,
        foundingDuration: req.body.foundingDuration
    });
    project.addProject(newProject, (err, project) => {
        if(err){
            res.json({success: false, message: 'failed to create project'});
        }   else {
            res.json({success: true, message: 'project created'});
        }
    });
});

router.get('/projectsPage', (req, res) => {
    project.find({}, (err, projects) => {
        if (err) {
            res.json({ success: false, message: err});
        } else {
            res.json({success: true, projects: projects});
        }
    } ).sort({'_id': -1});
});

router.get('/oneProject/:id', (req, res) => {
    project.findOne({_id: req.params.id}, (err, project) =>{

        if (err) {
        res.json({ success: false, message: err});

        } else {            
            res.json({success: true, project: project});
        }
    });
})

}
module.exports = router;