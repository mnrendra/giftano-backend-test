// error handler
const errorHandler = ({ name, message }, req, res, next) => {
  res.statu(500).json({
    status: 500,
    error: {
      name,
      message
    }
  })
  next()
}

module.exports = errorHandler
