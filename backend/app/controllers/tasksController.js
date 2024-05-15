const Task = require('../models').Task;

exports.show = (request, response) => {
    return Task.findByPk(request.params.taskId, {})
        .then((task) => {
            if (!task) {
                response.status(404).send({ error: 'Task not found' });
            } else {
                response.status(200).send(task);
            }
        })
        .catch((error) => response.status(400).send(error));
};

exports.create = async (request, response) => {
    return await Task.create(
        {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            dueData: request.body.dueDate,
            userId: request.userId,
        },
        {}
    ).then((newTask) =>
        Task.findByPk(newTask.id, {})
            .then((newTask) => response.status(201).send(newTask))
            .catch((error) => response.status(400).send(error))
    );
};
