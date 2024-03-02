/**
 *  This file abstract the generation of Unique Identifier.
*/
const crypto = require('crypto');



const generateuid = () => {
    return crypto.randomBytes(8).toString('hex');
}

module.exports = generateuid; 