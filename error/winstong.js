const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console()
  ],
});

const getLogger = ()=>{
    return logger;
};

module.exports = getLogger; 