require('dotenv').config();
const cors = require('cors');
const { swaggerDocument, swaggerUi } = require('./app/config/swagger.js');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./app/routes')(app);

app.get('/', (request, response) => response.send('Test'));

module.exports = app;
