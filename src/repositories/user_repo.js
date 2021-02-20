const path = require('path');
const { writeNewFile, fileExists, readFile } = require('../../lib/file');
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
                    const user = JSON.parse(data);
                    delete user.profile.password;
                    delete user.profile.token;
                    callback(null, user);
                }
            });
        } else {
            callback("User doesn't exist", null);
        }
    });
};

module.exports = {
    createUser,
    getUser,
};
