const express = require('express');
const applicationController = require('../controllers/applicationsController');
const applicationsRouter = express.Router();

applicationsRouter.post('/application/:userId', applicationController.createApp, (req, res) => {
    return res.status(200).json(res.locals.createApp);
});

applicationsRouter.get('/application/:userId', applicationController.getApp, (req, res) => {
    return res.status(200).json(res.locals.getApp);
});

// applicationsRouter.patch('/', (req, res) => {
    
// });

// applicationRouter.delete('/signup', userController.hashing, userController.createUser, (req, res) => {

// })

module.exports = applicationsRouter;