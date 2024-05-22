const app = require("./index");

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