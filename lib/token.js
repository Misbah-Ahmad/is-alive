const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(60).toString('hex');
module.exports = {
    generateToken,
};
