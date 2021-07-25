const mongoose = require('../config/database');

const Schema = mongoose.Schema;

const SchemaData = new Schema({
    id: { type: String, default:  new Date().getTime()},
    name: {type: String, required: true},
    value: {type: Number, required: true},
    since: {type: Date, required: true}
});

module.exports = mongoose.model('Customer', SchemaData);
