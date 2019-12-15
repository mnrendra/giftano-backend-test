// id not found handler
const idNotFound = (id, res) => {
  res.status(400).json({
    status: 400,
    error: {
      name: 'id not found!',
      message: `${id} id is not found! Please input the correct id!`
    }
  })
}

module.exports = idNotFound
