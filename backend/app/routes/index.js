const listenForAuthRoutes = require('../routes/authRoutes');
const listenForTaskRoutes = require('./taskRoutes');
const listenForUserRoutes = require('../routes/userRoutes');

module.exports = (app) => {
    listenForAuthRoutes(app);
    listenForTaskRoutes(app);
    listenForUserRoutes(app);
};
