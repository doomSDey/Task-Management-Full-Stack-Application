const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Load the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'));

swaggerDocument.servers = [
    {
        url: `http://localhost:${process.env.PORT}`,
    },
];

module.exports = { swaggerUi, swaggerDocument };
