const mongoose = require('mongoose');
const getLogger = require('../logs/WinstonLog.js');

const log = getLogger();

const connectMongoose = (url) =>{
    mongoose.connect(url).then(()=>{
        log.info('Connection to mongodb succesful');
    }).catch((err)=>{
        log.error(`error on connecting to mongodb`);
    });
};
const disconnectMongoose = ()=>{
    mongoose.disconnect().then(()=>{
        log.info('Diconnection from mongodb succesful.');
    }).catch((err)=>{
            log.erro(`Error from disconnecting from mongodb}`);
    });
};

module.exports = {
     connectMongoose, 
     disconnectMongoose
};