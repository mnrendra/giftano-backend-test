// invalid field handler
const fieldInvalid = (res, message) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'invalid field value!',
      message: message
    }
  })
}

// export module
module.exports = fieldInvalid
