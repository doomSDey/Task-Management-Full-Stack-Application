const User = require('../models').User;
const Task = require('../models').Task;

const userSerializationOptions = {
    include: [
        {
            model: Task,
            as: 'tasks',
        },
    ],
};

exports.show = (request, response) => {
    const userId = request.userId; // Get the authenticated user ID
    console.log('userId', userId);
    // Check if the authenticated user is requesting their own data
    if (userId.toString() !== request.params.userId) {
        return response.status(403).send({ error: 'Forbidden' });
    }

    return User.findByPk(userId)
        .then((user) => {
            if (!user) {
                response.status(404).send({ error: 'User not found' });
            } else {
                response.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    avatarId: user.avatarId,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(400).send('Some error occurred');
        });
};

exports.updateAvatar = async (request, response) => {
    const userId = request.userId;
    const { avatarId } = request.body; 

    const allowedAvatars = [
        'Avatar1',
        'Avatar2',
        'Avatar3',
        'Avatar4',
        'Avatar5',
        'Avatar6',
    ];

    if (!avatarId) {
        return response.status(400).send({ message: 'avatarId is required' });
    }

    if (!allowedAvatars.includes(avatarId)) {
        return response
            .status(400)
            .send({
                message:
                    'Invalid avatarId. Allowed values are Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6.',
            });
    }

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }

        user.avatarId = avatarId; // Update the avatarId
        await user.save();

        return response
            .status(200)
            .send({ message: 'Avatar updated successfully', user });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: 'Some error occurred' });
    }
};
