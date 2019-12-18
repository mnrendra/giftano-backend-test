// require databse module
require('./db')
// require node modules
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const config = require('config')
// require local modules
const logger = require('./logger')
const routes = require('./routes')
const { invalidJsonHandler } = require('./errors')

// require DEV config
const { DEV_PORT } = config.get('DEV')

// set init app
const app = express()

// middleware
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(invalidJsonHandler)
app.use(routes)

// set port
const PORT = process.env.PORT || DEV_PORT
// start listening
app.listen(PORT, logger.info(`${new Date()} : listen on port ${PORT}`))
