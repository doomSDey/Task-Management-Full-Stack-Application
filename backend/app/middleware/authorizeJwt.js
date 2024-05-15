const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

function verifyToken(request, response, next) {
    let authHeader = request.headers['authorization'];
    if (!authHeader) {
        return response.status(403).send({ error: 'No token provided' });
    }

    // Extract the token from the 'Bearer <token>' format
    let token = authHeader.split(' ')[1];
    if (!token) {
        return response.status(403).send({ error: 'Invalid token format' });
    }

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            return response.status(401).send({ error: 'Unauthorized' });
        }
        request.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyToken: verifyToken,
};
