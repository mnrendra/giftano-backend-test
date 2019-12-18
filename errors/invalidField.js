/**
 * invalidField function
 */
const invalidField = (res, message) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'invalid field value!',
      message: message
    }
  })
}

// export module
module.exports = invalidField
