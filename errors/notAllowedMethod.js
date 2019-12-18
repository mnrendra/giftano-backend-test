/**
 * notAllowedMethod function
 */
const notAllowedMethod = ({ method }, res) => {
  res.status(405).json({
    status: 405,
    error: {
      name: 'not allowed method',
      message: `${method} method is not allowed!`
    }
  })
}

// export module
module.exports = notAllowedMethod
