const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models/userModels');

const userController = {};

userController.hashing = async (req, res, next) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashWord = await bcrypt.hash(password, salt);
    res.locals.hashWord = hashWord;
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.hasing',
      message: { err: 'Error hashing password' },
    });
  }
};

userController.createUser = (req, res, next) => {
  const { firstName, lastName, username, email } = req.body;
  const hashWord = res.locals.hashWord;

  const params = [firstName, lastName, username, hashWord, email];
  const query = `INSERT INTO users(firstname, lastname, username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  // const passQuery = `SELECT password FROM users WHERE username = '${username}'`;

  db.query(query, params)
    .then((createdUser) => {
      res.locals.createdUser = createdUser.rows[0];
      console.log('Created user: ', createdUser);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in userController.createUser',
        message: { err: 'Error creating user'},
      });
    });
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  const passQuery = `SELECT password FROM users WHERE username = '${username}'`;
  //query for the stored password in the database using the username as the condition
  //use bcrypt compare to check entered password and stored password
  try {
    const storedPass = await db.query(passQuery);
    if(!storedPass.rows.length){
      return next({
        log: 'Error in userController.verifyUser',
        message: { err: 'User not found'},
      })
    }

    const dbPass = storedPass.rows[0].password;
    const queryResult = await bcrypt.compare(password,dbPass);

    if (!queryResult) {
      return next({
        log: 'Error in userController.verifyUser',
        message: { err: 'Password not match'},
      })
    }
    res.locals.loginPassword = dbPass;
    res.locals.userName = username
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.verifyUser',
      message: { err: 'small error in userController.verifyUser' },
    });
  }
};

userController.setCookies = (req, res, next) => {
  res.cookie('ssid', res.locals.username, { httpOnly: true })
  return next();
}

module.exports = userController;
