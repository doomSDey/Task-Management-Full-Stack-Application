const listenForAuthRoutes = require('../routes/authRoutes');
const listenForTaskRoutes = require('../routes/taskRoutes');
const listenForUserRoutes = require('../routes/userRoutes');

module.exports = (app) => {
    listenForAuthRoutes(app);
    listenForTaskRoutes(app);
    listenForUserRoutes(app);
};
