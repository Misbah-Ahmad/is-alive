const http = require('http');

module.exports = {
    createServer: (handler, port) => {
        const server = http.createServer(handler);
        server.listen(port);
        console.log(`listening on port: ${port}`);
    },
};
