const home = require('./request_handlers/home');
const notFound = require('./request_handlers/not_found');
const user = require('./request_handlers/user_handler');

module.exports = (path) => {
    switch (path) {
        case '/':
            return home;
        case '/users':
            return user;
        default:
            return notFound;
    }
};
