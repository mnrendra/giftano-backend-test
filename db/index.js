// require node modules
const mongoose = require('mongoose')
const config = require('config')
// require local modules
const logger = require('../logger')

// require DEV config
const { DEV_DB } = config.get('DEV')

// set databse url
const DB_URL = process.env.DB_URL || DEV_DB

// set connection
mongoose
  .connect(DB_URL, {
    // set mongodb options
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(({ connections }) => {
    // destructuring user, host, port, and name of database from mongoose connections
    const { user, host, port, name } = connections[0]
    // logging databse properties
    logger.info(`${new Date()} : db connected on ${user || 'root'}@${host}:${port}/${name}`)
  })
  .catch(({ stack }) => {
    // logging catch error
    logger.error(`${new Date()} : ${stack}`)
  })

// export module
module.exports = mongoose
