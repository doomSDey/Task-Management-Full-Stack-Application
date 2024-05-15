const auth = require('./authController.js');
const users = require('./usersController.js');
const tasks = require('./tasksController.js');

module.exports = {
    auth,
    tasks,
    users,
};
