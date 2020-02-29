if (!process.env.DB_NAME) {
    require('dotenv').config();
}
module.exports = {
    "development": {
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD || null,
        "dialect": "mysql",
        "dialectOptions": {},
    },
    "staging": {
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD || null,
        "dialect": "mysql",
        "dialectOptions": {},
    },
    "production": {
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOST,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD || null,
        "dialect": "mysql",
        "dialectOptions": {},
    }
};