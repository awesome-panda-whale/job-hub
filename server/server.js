const express = require('express');
// const { restart } = require('nodemon');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const db = require('./models/userModels')
// const routerSignup = require('./routes/users');
const userRoutes = require("./routes/users");

const app = express();
// const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/", userRoutes);

// test
app.get('/testdb', async (req, res) => {
  const result = await db.query('SELECT * FROM users LIMIT 1')
  console.log('result', result);
  res.status(200).json(result)
});

// Global error handler: 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
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
