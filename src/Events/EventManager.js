const getCurrentDateTime = require('../shared/DateUtil.js');
require('log-timestamp');
let eventCallBack;

let isProcessing = false;

const subscribetoEvent = (callback) => {
    eventCallBack = callback;
}

const publishEvent = (event, message) => {
    console.log(event + " ::: " + message);
    if (eventCallBack && !isProcessing) {
        isProcessing = true;
        eventCallBack(event, message, getCurrentDateTime());
        isProcessing = false;
    }

}

module.exports = { subscribetoEvent, publishEvent };