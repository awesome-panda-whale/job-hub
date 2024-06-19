const express = require('express');
const userController = require('../controllers/userController');

// const fileController = require('../controllers/fileController');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE

router.post(
  "/signup",
  userController.hashing,
  userController.createUser,
  (req, res) => {
    return res.status(200).json(res.locals.createdUser);
  }
);

router.post("/login", userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});
// ADD GET MORE CHARACTERS ROUTE HANDLER HERE

module.exports = router;
//amcatee
//codesmith
//ashe
//mcatee
