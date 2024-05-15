const database = require('../models');
const config = require('../config/auth.config.js');
const User = database.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUp = (request, response) => {
    // Validate required fields
    const { username, email, password, avatarId } = request.body;
    if (!username || !email || !password || !avatarId) {
        return response.status(400).send({
            message: 'Name, email, password, avatar fields are required.',
        });
    }

    return User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        avatarId,
    })
        .then((newUser) => response.status(201).send(newUser))
        .catch((error) =>
            response.status(500).send({ message: error.message })
        );
};

exports.signIn = (request, response) => {
    console.log('here');
    const signInError = {
        accessToken: null,
        message: 'Invalid email or password',
    };

    return User.findOne({ where: { email: request.body.email } })
        .then((user) => {
            if (!user) return response.status(401).send(signInError);

            const validPassword = bcrypt.compareSync(
                request.body.password,
                user.password
            );

            if (!validPassword) return response.status(401).send(signInError);

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            response.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                avatarId: user.avatarId,
                accessToken: token,
            });
        })
        .catch((error) =>
            response.status(500).send({ message: error.message })
        );
};
