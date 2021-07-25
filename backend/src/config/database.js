const mongoose = require('mongoose');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, MONGO_PORT } = process.env;

const url = `mongodb://${DB_HOST}:${MONGO_PORT}/${DB_NAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;

mongoose.connect(url, {useNewUrlParser: true} );

module.exports = mongoose;