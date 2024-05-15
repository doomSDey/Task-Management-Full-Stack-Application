const database = require('../models');
const config = require('../config/auth.config.js');
const User = database.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signUp = async (request, response) => {
    // Validate required fields
    const { username, email, password, avatarId } = request.body;
    if (!username || !email || !password || !avatarId) {
        return response.status(400).send({
            message: 'Name, email, password, avatar fields are required.',
        });
    }

    try {
        const newUser = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, 8),
            avatarId,
        });

        const token = jwt.sign({ id: newUser.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        response.status(201).send({
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                avatarId: newUser.avatarId,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            },
            accessToken: token,
        });
    } catch (error) {
        return response.status(400).send('Some error occurred');
    }
};

exports.signIn = async (request, response) => {
    const signInError = {
        accessToken: null,
        message: 'Invalid email or password',
    };

    try {
        const user = await User.findOne({
            where: { email: request.body.email },
        });

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
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatarId: user.avatarId,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            accessToken: token,
        });
    } catch (error) {
        console.log(error);
        return response.status(400).send('Some error occurred');
    }
};
