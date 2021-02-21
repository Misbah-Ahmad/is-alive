const path = require('path');
const { writeNewFile, fileExists, readFile, updateFile } = require('../../lib/file');
const { dataFolderPath } = require('../config/config');
const { makeHash } = require('../../lib/hash');
const { generateToken } = require('../../lib/token');

const createUser = (data, callback) => {
    // eslint-disable-next-line object-curly-newline
    const { name, phone, email, password } = { ...data };
    const filePath = path.join(dataFolderPath, `${phone}.json`);
    fileExists(filePath, (exists) => {
        if (!exists) {
            const newUserData = {
                profile: {
                    name,
                    phone,
                    email,
                    password: makeHash(password),
                    token: generateToken(),
                },
            };
            writeNewFile(filePath, newUserData, (error) => callback(error));
        } else {
            callback('User already exists');
        }
    });
};

const getUser = (phone, callback) => {
    const filePath = path.join(dataFolderPath, `${phone}.json`);
    fileExists(filePath, (exists) => {
        if (exists) {
            readFile(filePath, (error, data) => {
                if (error) {
                    callback("User doesn't exist", null);
                } else {
                    callback(null, JSON.parse(data));
                }
            });
        } else {
            callback("User doesn't exist", null);
        }
    });
};

const refreshUserToken = (phone, callback) => {
    const filePath = path.join(dataFolderPath, `${phone}.json`);

    getUser(phone, (error, data) => {
        if (!error) {
            const user = data;
            user.profile.token = generateToken();
            updateFile(filePath, user, (updateError) => callback(updateError));
        } else {
            callback(true); // error  == true
        }
    });
};

module.exports = {
    createUser,
    getUser,
    refreshUserToken,
};
