const getCurrentDateTime = require('../shared/DateUtil.js');
require('log-timestamp');

let subscribers = [];
let isProcessing = false;

const subscribetoEvent = (callback) => {
    subscribers.push(callback);
}

const publishEvent = (event, message) => {
    console.log(event + " ::: " + message);
    if (!isProcessing) {
        isProcessing = true;
        subscribers.forEach(callback => {
            callback(event, message, getCurrentDateTime());
        });
        isProcessing = false;
    }

}

module.exports = { subscribetoEvent, publishEvent };