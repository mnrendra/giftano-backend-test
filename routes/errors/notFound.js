// not found handler
const notFound = (req, res) => {
  res.status(404).json({
    status: 404,
    error: {
      name: 'not found!',
      message: 'enpoint not found!'
    }
  })
}

module.exports = notFound
