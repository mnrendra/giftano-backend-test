// require winston
const winston = require('winston')

// create logger config
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: '../logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '../logs/all.log' })
  ]
})

// set development option
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

// set logger as global variable
module.exports = logger
