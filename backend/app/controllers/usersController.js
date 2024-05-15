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
                response.status(200).send(user);
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(400).send('Some error occurred');
        });
};
