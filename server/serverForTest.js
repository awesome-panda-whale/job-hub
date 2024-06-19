// serverForTest.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerSignup = require('./routes/users');
const applicationsRouter = require('./routes/applications');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', routerSignup);
app.use('/applications', applicationsRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json({ message: errorObj.message });
});

module.exports = app;
