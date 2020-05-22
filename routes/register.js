const express = require('express');
const router = express.Router();
const userRegister = require("../db/sql-users");
const jwt = require('jsonwebtoken')

const jwtKey = 'staycool_stayraw';
const jwtExpirySeconds = 4200;

/* GET a JWT for user. */
router.post('/', async (req, res, next) => {
  try {
    console.log('In user registration');
    // Get details from JSON body
    const userEmail = req.body.userEmail;
    const userName = req.body.userName;
    if (userEmail || userName) {
      // return 401 error if email oe user name does not exists
      return res.status(401).end();
    }

    // Insert the user details in the DB
    const userID = await userRegister.insertUser(userName, userEmail).catch((error) => {
      throw error;
    });

    // Create a new token with the username in the payload
    // and which expires 4200 seconds after issue
    const token = jwt.sign({
      userID
    }, jwtKey, {
      algorithm: 'HS256',
      expiresIn: jwtExpirySeconds
    })
    console.log('token:', token)

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    res.cookie('token', token, {
      maxAge: jwtExpirySeconds * 1000
    })
    res.send({
      status: "ok"
    });
  } catch (error) {
    console.log(`user registration error, details are: ${error}`);
    res.status(err.status || 500);
    res.render('error', {
      status: err.status,
      message: err.message + " \n Redirecting to home page..!!"
    });
  }

});

module.exports = router;