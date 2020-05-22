const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    let payload = {
        title: "Uday Singh"
    }
    console.log('Some asked for the home page');
    res.render('index', {
        payload: payload
    });
});

// Healthcheck route for Load balancer
router.get('/healthcheck', (req, res, next) => {
    console.log('Some asked for the healthchecl page');
    res.status(200);
    res.send('Healthy\n');
});

module.exports = router;