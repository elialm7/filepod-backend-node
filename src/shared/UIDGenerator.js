/**
 *  This file abstract the generation of Unique Identifier.
*/
const crypto = require('crypto');



const generateUID = () => {
    return crypto.randomBytes(8).toString('hex');
}

module.exports = generateUID; 