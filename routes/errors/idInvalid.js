// invalid id handler
const idInvalid = (id, res) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'invalid id!',
      message: `${id} id is not valid! Please input the correct id!`
    }
  })
}

module.exports = idInvalid
