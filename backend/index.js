require('dotenv').config();
const cors = require('cors');
const { swaggerUi, specs } = require('./app/config/swagger.js');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

require('./app/routes')(app);

app.get('/', (request, response) => response.send('Test'));

app.listen(process.env.PORT, () =>
    console.log(`Listening: port ${process.env.PORT}`)
);
