require('dotenv').config();
const { swaggerUi, specs } = require('./app/config/swagger.js');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

require('./app/routes/index.js')(app);

app.get('/', (request, response) => response.send('Test'));

app.listen(process.env.PORT, () =>
    console.log(`Listening: port ${process.env.PORT}`)
);
