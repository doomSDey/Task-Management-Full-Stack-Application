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

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Listening: port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutdown Initiated');
    server.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Shutdown Initiated');
    server.close();
    process.exit(0);
});

module.exports = app;
