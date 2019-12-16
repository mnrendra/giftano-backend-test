// require express Router
const router = require('express').Router()

// set all method on all path as not found
router.all('/', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'not found!'
  })
})

// export module
module.exports = router
