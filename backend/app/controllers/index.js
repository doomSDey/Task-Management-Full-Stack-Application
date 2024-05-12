const auth = require('./authController.js');
const users = require('./usersController.js');
const notes = require('./notesController.js');

module.exports = {
    auth,
    notes,
    users,
};
