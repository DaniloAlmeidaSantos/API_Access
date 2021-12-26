const jwt = require('jsonwebtoken');

function userAuth(req, res, next){
    // Receiving token in headers
    const token = req.headers['x-access-token'];

    // Verifyng if token existis in headers
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    // Verify if token is correct
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        // Verify if ocurred error in authenticate
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        // If is all ok, save the token for next requisitions
        req.userId = decoded.id;

        next();
    });
}

module.exports = userAuth;