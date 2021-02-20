const url = require('url');
const server = require('./config/server');
const router = require('./router');
const env = require('./config/env');

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
        postData: null,
    };

    let postData = '';

    req.on('data', (buffer) => {
        postData += buffer.toString();
    });

    req.on('end', () => {
        request.postData = JSON.parse(postData);
        handler(request, (statusCode, response) => {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(typeof statusCode === 'number' ? statusCode : 500);
            res.end(
                // eslint-disable-next-line prettier/prettier
                (typeof response === 'object' && response !== null)
                    ? JSON.stringify(response)
                    : response
            );
        });
    });
};

server.createServer(requestHandler, env.port);
