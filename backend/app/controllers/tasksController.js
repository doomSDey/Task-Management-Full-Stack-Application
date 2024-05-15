const Task = require('../models').Task;

exports.show = (request, response) => {
    const userId = request.userId;

    return Task.findOne({
        where: {
            id: request.params.taskId,
            userId: userId,
        },
    })
        .then((task) => {
            if (!task) {
                response.status(404).send({ error: 'Task not found' });
            } else {
                response.status(200).send(task);
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(400).send('Some error occurred');
        });
};

exports.create = async (request, response) => {
    const { title, description, status, dueDate, color } = request.body;
    const userId = request.userId; // Get the authenticated user ID

    // Validate required fields
    if (!title || !description || !status || !color) {
        return response.status(400).send({
            message:
                'Title, description, status, and color are required fields.',
        });
    }

    try {
        const newTask = await Task.create({
            title,
            description,
            status,
            dueDate,
            color,
            userId,
        });

        return response.status(201).send(newTask);
    } catch (error) {
        console.log('error', error);
        return response.status(400).send('Some error occurred');
    }
};
