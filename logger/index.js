// require winston
const winston = require('winston')
// destructuring from winston object
const { transports, format } = winston
const { simple } = format
const { File, Console } = transports

// create logger config
const logger = winston.createLogger({
  format: simple(),
  transports: [
    new File({ filename: './logs/error.log', level: 'error' }),
    new File({ filename: './logs/all.log' })
  ]
})

// set development option
if (process.env.NODE_ENV !== 'production') {
  logger.add(new Console({
    format: simple()
  }))
}

// set logger as global variable
module.exports = logger
