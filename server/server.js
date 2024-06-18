const express = require('express');
// const { restart } = require('nodemon');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routerSignup = require('./routes/users');
const applicationController = require('./controllers/applicationsController');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'), function(err){
        if(err){
            res.status(500).send(err)
        }
    })
})

app.use('/users', routerSignup);
app.post('/application', applicationController.createApp,  (req, res ) => {
  res.status(200).json(res.locals.application)
});
app.get('/application/:userID, ')
// Global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen((3000), ()=> {
  console.log('listening on port 3000')
}); //listens on port 3000 -> http://localhost:3000/
