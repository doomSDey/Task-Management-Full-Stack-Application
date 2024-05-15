const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const { applyServerHardening } = require('../middleware/serverHardening');

const routes = (app) => {
    // Apply server hardening
    applyServerHardening(app);

    app.use((request, response, next) => {
        response.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/tasks', taskRoutes);
};

module.exports = routes;
