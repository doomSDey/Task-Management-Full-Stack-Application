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

exports.update = async (request, response) => {
    const userId = request.userId; // Get the authenticated user ID
    const { taskId } = request.params;
    const { title, description, status, dueDate, color } = request.body;

    try {
        const task = await Task.findOne({
            where: {
                id: taskId,
                userId: userId,
            },
        });

        if (!task) {
            return response.status(404).send({ error: 'Task not found' });
        }

        // Ensure that id, createdDate, and updatedDate cannot be modified
        const updatedFields = { title, description, status, dueDate, color };

        Object.keys(updatedFields).forEach((key) => {
            if (updatedFields[key] === undefined) {
                delete updatedFields[key];
            }
        });

        await task.update(updatedFields);

        return response.status(200).send(task);
    } catch (error) {
        console.log(error);
        return response.status(400).send({ message: 'Some error occurred' });
    }
};

exports.delete = async (request, response) => {
    const userId = request.userId; // Get the authenticated user ID
    const { taskId } = request.params;
    console.log('test', taskId, userId);
    try {
        const task = await Task.findOne({
            where: {
                id: taskId,
                userId: userId,
            },
        });

        if (!task) {
            return response.status(404).send({ error: 'Task not found' });
        }

        await task.destroy();
        return response
            .status(200)
            .send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: 'Some error occurred' });
    }
};
