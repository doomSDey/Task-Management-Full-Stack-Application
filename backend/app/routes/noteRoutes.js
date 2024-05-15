const { authorizeJwt } = require('../middleware');
const tasksController = require('../controllers').tasks;

module.exports = (app) => {
    app.get('/tasks/:taskId', tasksController.show);
    app.post('/tasks', [authorizeJwt.verifyToken], tasksController.create);
};
