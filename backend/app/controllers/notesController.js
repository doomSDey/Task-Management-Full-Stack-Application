const Note = require('../models').Note;

exports.show = (request, response) => {
    return Note.findByPk(request.params.noteId, {})
        .then((note) => {
            if (!note) {
                response.status(404).send({ error: 'Note not found' });
            } else {
                response.status(200).send(note);
            }
        })
        .catch((error) => response.status(400).send(error));
};

exports.create = async (request, response) => {
    return await Note.create(
        {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            dueData: request.body.dueDate,
            userId: request.userId,
        },
        {}
    ).then((newNote) =>
        Note.findByPk(newNote.id, {})
            .then((newNote) => response.status(201).send(newNote))
            .catch((error) => response.status(400).send(error))
    );
};
