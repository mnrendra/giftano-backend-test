/**
 * requireField function
 */
const requireField = (res, field, message) => {
  res.status(400).json({
    status: 400,
    error: {
      name: `${field} field is required!`,
      message: `${field} ${message || 'field cannot be empty'}!`
    }
  })
}

// export module
module.exports = requireField
