// id required handler
const idRequired = (res) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'id params is required!',
      message: 'id parameter is required!'
    }
  })
}

// export module
module.exports = idRequired
