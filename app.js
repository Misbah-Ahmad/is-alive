const server = require('./server');
const { port } = require('./config');

const requestHandler = (req, res) => {
    console.log('Request Handler');
    res.end(`${req.method} ${req.url}`);
};

server.createServer(requestHandler, port);
