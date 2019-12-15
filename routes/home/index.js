// require express Router
const router = require('express').Router()
// require error module
const { methodNotAllowed } = require('../errors')

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Hello Giftano!'
  })
})

router.all('/', methodNotAllowed)

module.exports = router
