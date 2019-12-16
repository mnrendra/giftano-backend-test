// require logger modules
const logger = require('../../logger')
// error handler
const errorHandler = ({ name, message, stack }, req, res, next) => {
  // loging error into logs file
  logger.error(`${new Date()} : ${stack}`)
  // send error message to client
  res.status(500).json({
    status: 500,
    error: {
      name,
      message
    }
  })
  next()
}

// export module
module.exports = errorHandler
