/**
 * requireId function
 */
const requireId = (req, res) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'id params is required!',
      message: 'require id parameter!'
    }
  })
}

// export module
module.exports = requireId
