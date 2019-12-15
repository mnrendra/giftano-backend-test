// not allowed method handlers
const methodNotAllowed = ({ method }, res) => {
  res.status(405).json({
    status: 405,
    error: {
      name: 'method not allowed',
      message: `${method} method is not allowed!`
    }
  })
}

module.exports = methodNotAllowed
