const express = require('express');
const router = express.Router();
const educationHelper = require("../db/sql-education");
const jwt = require('jsonwebtoken')

const jwtKey = 'staycool_stayraw';

/* GET education home page. */
router.get('/', async (req, res, next) => {
    try {
        console.log('calling education helper');
        const token = req.cookies.token
        // if the cookie is not set, return an unauthorized error
        if (!token) {
            return res.status(401).end()
        }

        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        const payload = jwt.verify(token, jwtKey)
        // Finally, return the welcome message to the user, along with their
        // userID given in the token
        const results = await educationHelper.geteduPageDetails();
        console.log(`results are: ${JSON.stringify(results, null, 2)}`);
        // We can obtain the session token from the requests cookies, which come with every request
        res.send(`Welcome ${payload.userID}!`)
    } catch (error) {
        console.log(`education error, details are: ${error}`);
        res.status(err.status || 500);
        res.render('error', {
            status: err.status,
            message: err.message + " \n Redirecting to home page..!!"
        });

    }
});

module.exports = router;