const url = require('url');
const server = require('./server');
const { port } = require('./config');
const router = require('./router');

const requestHandler = (req, res) => {
    const parsedReqeust = url.parse(req.url, true);
    const path = parsedReqeust.pathname.replace(/^\/+\/+$/g, '');
    console.log(`Request Handler ${path}`);

    const handler = router(path);
    const request = {
        path,
        method: req.method.toUpperCase(),
        headers: req.headers,
        query: parsedReqeust.query,
    };

    let postData = '';

    req.on('data', (buffer) => {
        postData += buffer.toString();
    });

    request.postData = postData;

    req.on('end', () => {
        handler(request, (statusCode, response) => {
            res.writeHead(statusCode);
            res.end(typeof response !== 'object' ? JSON.stringify(response) : response);
        });
    });
};

server.createServer(requestHandler, port);
