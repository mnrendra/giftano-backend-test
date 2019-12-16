// require express Router
const router = require('express').Router()
// require error module
const { methodNotAllowed } = require('../errors')

// set home GET request
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    success: {
      name: 'Hello Giftano!',
      message: 'please read the documentation on the https://github.com/mnrendra/giftano-backend-test'
    }
  })
})
// prevent else method
router.all('/', methodNotAllowed)

// export module
module.exports = router
