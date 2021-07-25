const server = require('./server.js');
const { SERVER_LIST } = process.env;

server.listen(SERVER_LIST, () => {
    console.log('API ONLINE');
});