const { getUser } = require('../repositories/user_repo');
const { makeHash } = require('../../lib/hash');

const login = (request, responseCallback) => {
    const { phone, password } = request.postData;

    const hasedPassword = makeHash(password);

    getUser(phone, (error, data) => {
        if (!error) {
            if (data.profile.password === hasedPassword) {
                responseCallback(200, {
                    success: true,
                    token: data.profile.token,
                });
            } else {
                responseCallback(200, { success: false, message: 'Invalid credentials' });
            }
        } else {
            responseCallback(404, {
                success: false,
                message: "User doesn't exist",
                data: null,
            });
        }
    });
};

const authHandler = (request, responseCallback) => {
    switch (request.method) {
        case 'POST':
            login(request, responseCallback);
            break;
        default:
            responseCallback(405, { success: false, message: 'Invalid request' });
            break;
    }
};

module.exports = authHandler;
