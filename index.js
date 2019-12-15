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

// require config
const { DEV_PORT } = config.get('DEV')

// set app
const app = express()

// middleware
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(routes)

// set port
const PORT = process.env.PORT || DEV_PORT
// start listening
app.listen(PORT, logger.info(`listen on port ${PORT}`))
