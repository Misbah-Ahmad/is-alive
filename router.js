const home = require('./request_handlers/home');
const notFound = require('./request_handlers/not_found');

module.exports = (path) => {
    switch (path) {
        case '/':
            return home;
        default:
            return notFound;
    }
};
