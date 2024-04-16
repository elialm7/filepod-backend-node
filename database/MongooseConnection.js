const mongoose = require('mongoose');
const getLogger = require('../logs/WinstonLog');
const log = getLogger();

const connectMongoose = (url) =>{
    mongoose.connect(url).then(()=>{
        log.info('Connection to mongodb succesful');
    }).catch((err)=>{
        log.error(`error on connecting to mongodb: ${err}`);
    });
}

module.exports = connectMongoose; 