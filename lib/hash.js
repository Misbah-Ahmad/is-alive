const crypto = require('crypto');

const makeHash = (str) => crypto.createHash('sha256').update(str).digest('hex');

module.exports = {
    makeHash,
};
