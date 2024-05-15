const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Tracker Backend',
            version: '1.0.0',
            description:
                'APIs for facilatating CRUD operation for Task Tracker App',
        },
        servers: [
            {
                url: cors({ origin: `http://localhost:${process.env.PORT}` }),
            },
        ],
    },
    apis: ['../routes/*.js', '../models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
