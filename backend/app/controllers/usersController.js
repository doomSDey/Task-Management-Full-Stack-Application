const User = require('../models').User;
const Note = require('../models').Note;

const userSerializationOptions = {
    include: [
        {
            model: Note,
            as: 'notes',
        },
    ],
};

exports.show = (request, response) => {
    return User.findByPk(request.params.userId, userSerializationOptions)
        .then((user) => {
            if (!user) {
                response.status(404).send({ error: 'User not found' });
            } else {
                response.status(200).send(user);
            }
        })
        .catch((error) => response.status(400).send(error));
};
