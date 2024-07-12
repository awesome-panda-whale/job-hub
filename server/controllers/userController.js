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

userController.createUser = async (req, res, next) => {
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

  const loginQuery = `SELECT * FROM users WHERE username = '${username}'`;
  //query for the stored password in the database using the username as the condition
  //use bcrypt compare to check entered password and stored password

  if (!username) {
    return next({
      log: 'Error in userController.verifyUser, username is required',
      messgae: 'username is required',
      status: 400
    });
  }

  try {
    const result = await db.query(loginQuery);
    console.log("userController.verifyUser result", result);
    //console.log(storedPass, ' this is storedPass');
    // const dbPass = storedPass.rows[0].password;
    //console.log(dbPass, ' this is dbPass');
    const dbPassword = result.rows[0].password;

    const isMatch = await bcrypt.compare(password, dbPassword);
    //console.log(queryResult + ' this is queryResult');
    //console.log(storedPass + 'this is storedpass');
    // if (queryResult) {
    // res.locals.loginPassword = dbPass;
    // res.locals.userName = username
    // }
    console.log('result!!!', result)
    if (isMatch) {
      res.locals.user = {
        success: true,
        message: "login successfully",
        data: {
          userId: result.rows[0].id,
          username: result.rows[0].username,
        },
      };
      return next();
    }
  } catch (err) {
    return next({
      log: `Error in userController.verifyUser, ${err}`,
      message: { err: "Error occurred in post request to /login" },
      status: 500,
    });
  }
};

userController.setCookies = (req, res, next) => {
  const { username } = req.body;
  res.cookie(currentUser, username)
  res.send("cookie set")
  return next();
}

module.exports = userController;