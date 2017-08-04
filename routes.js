const base64 = require('base-64');

var express = require('express');
var router = express.Router();

const db = require('./db');

let verifyToken = require('./verifyToken');



router.get('/', (req, res) => {
    res.send('Home page on router.');
});

router.post('/authenticate', (req, res) => {
    db.authenticate(req.body.username, req.body.password, (data) => {
        res.json(data);
    });
});

router.get('/profile', verifyToken, (req, res) => {
    // req.username username from token
    res.send(req.username + '\'s profile page.');
});

router.get('/getAllUsers', verifyToken, (req, res) => {
    db.getAllUsers(function (users) {
        res.json(users);
    });
});

router.post('/newUser', (req, res) => {

    var newUser = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass,
        isAdmin: false
    }
     db.addUser(newUser, (user) => {
        res.json({
            msg: 'Registration successful, please login.',
            success: true,
            id: user._id,
            username: user.username
        });
    }); 
    // res.json({ msg: 'Registration successful, please login.'})
});


module.exports = router;