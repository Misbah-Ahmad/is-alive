const home = require('./request_handlers/home');
const notFound = require('./request_handlers/not_found');
const user = require('./request_handlers/user_handler');
const { loginHandler, logoutHandler } = require('./request_handlers/auth');

module.exports = (path) => {
    switch (path) {
        case '/':
            return home;
        case '/users':
            return user;
        case '/login':
            return loginHandler;
        case '/logout':
            return logoutHandler;
        default:
            return notFound;
    }
};
