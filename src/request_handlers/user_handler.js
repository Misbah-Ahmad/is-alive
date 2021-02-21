const { createUser, getUser } = require('../repositories/user_repo');

const createNewUser = (request, responseCallback) => {
    createUser(request.postData, (error) => {
        if (!error) {
            responseCallback(200, { success: true, message: 'User created successfully' });
        } else {
            responseCallback(500, { success: false, message: 'Could not create the user' });
        }
    });
};

const getSingleUser = (phone, responseCallback) => {
    getUser(phone, (error, data) => {
        if (!error) {
            const user = data;
            delete user.profile.password;
            delete user.profile.token;

            responseCallback(200, { success: true, user });
        } else {
            responseCallback(500, {
                success: false,
                message: "User doesn't exist",
                data: null,
            });
        }
    });
};

const user = (request, responseCallback) => {
    switch (request.method) {
        case 'POST':
            createNewUser(request, responseCallback);
            break;
        case 'GET':
            getSingleUser(request.query.phone, responseCallback);
            break;
        default:
            break;
    }
};

module.exports = user;
