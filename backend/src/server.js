const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());

const Customers = require('./routes/CustomersRoutes');
server.use('/customers', Customers);

server.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = server;
