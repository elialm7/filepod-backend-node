const crypto = require('crypto');
const createHash = () => {
    return crypto.randomBytes(8).toString('hex');
};
module.exports = createHash;