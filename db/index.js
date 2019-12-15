// require node modules
const mongoose = require('mongoose')
const config = require('config')
// require local modules
const logger = require('../logger')

// require config
const { DEV_DB } = config.get('DEV')

// set databse url
const DB_URL = process.env.DB_URL || DEV_DB

// set connection
mongoose
  .connect(DB_URL, {
    // mongodb options
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(({ connections }) => {
    // log databse properties
    const { user, host, port, name } = connections[0]
    logger.info(`db connected on ${user}@${host}:${port}/${name}`)
  })
  .catch(error => {
    // log catch error
    logger.error(error)
  })

module.exports = mongoose
