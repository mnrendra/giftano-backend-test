// require express module
const express = require('express')
// set router
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'hallo Giftano!'
  })
})

module.exports = router
