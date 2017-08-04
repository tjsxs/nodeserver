var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) { //failed verification.
                return res.json({
                    "success": false,
                    "info" :"Token expired, please re-authenticate."
                });
            }
            req.decoded = decoded;
            req.username = decoded.username;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).json({
            "success": false,
            "info": "Not authorized."
        });
    }
}