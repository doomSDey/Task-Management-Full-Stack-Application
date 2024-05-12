const listenForAuthRoutes = require('../routes/authRoutes');
const listenForNoteRoutes = require('./noteRoutes');
const listenForUserRoutes = require('../routes/userRoutes');

module.exports = (app) => {
    listenForAuthRoutes(app);
    listenForNoteRoutes(app);
    listenForUserRoutes(app);
};
