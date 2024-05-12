require('dotenv').config();

const { DEV_DATABASE_HOST, DEV_DATABASE_USERNAME, DEV_DATABASE_PASSWORD } =
    process.env;

module.exports = {
    development: {
        username: DEV_DATABASE_USERNAME,
        password: DEV_DATABASE_PASSWORD,
        database: 'note_maker_backend_dev',
        host: DEV_DATABASE_HOST,
        dialect: 'postgres',
    },
    test: {
        username: 'postgres',
        password: admin,
        database: 'note_maker_backend',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        username: 'root',
        password: null,
        database: 'note_maker_backend_prod',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
};
