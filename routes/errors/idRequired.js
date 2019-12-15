// id required handler
const idRequired = (req, res) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'id params is required!',
      message: 'id parameter is required'
    }
  })
}

module.exports = idRequired
