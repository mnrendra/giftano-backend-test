/**
 * sameValue function
 */
const sameValue = (res) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'same value!',
      message: 'data value is same.'
    }
  })
}

// export module
module.exports = sameValue
