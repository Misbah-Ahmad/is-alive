const path = require('path');
const { writeNewFile, fileExists } = require('../../lib/file');
const { dataFolderPath } = require('../config/config');
const { makeHash } = require('../../lib/hash');

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
                },
            };
            writeNewFile(filePath, newUserData, (error) => callback(error));
        } else {
            callback('User already exists');
        }
    });
};
module.exports = {
    createUser,
};
