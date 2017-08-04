const Datastore = require('nedb');
var db = new Datastore({ filename: './database/users.db', autoload: true });
var db2 = new Datastore({ filename: './database/posts.db', autoload: true });

var jwt = require('jsonwebtoken');

module.exports.addUser = function (user, cb) {
    db.insert(user, (err, doc) => {
        if (err) throw err;
        console.log('id: ' + doc._id);
        cb(doc);
    });
};

module.exports.getAllUsers = function (callback) {
    db.find({}, function(err, doc) {
        callback(doc);
    });
}

module.exports.authenticate = function (uname, pass, callback) { 
    db.find({ username: uname }, (err, userArray) => {
        if (err) throw err;

        if (userArray.length == 0) {
            callback({
                success: false,
                msg: 'Username not found.'
            });
        } else {
            if (userArray[0].password == pass) {

                var token = jwt.sign({ username: userArray[0].password}, 'secret', { expiresIn: 60 * 2 });

                callback({
                    success: true,
                    msg: 'Authentication successful!.',
                    token: token
                });
            } else {
                callback({
                    success: false,
                    msg: 'Wrong password.'
                });
            }
        }
    });
};