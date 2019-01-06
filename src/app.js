
const express = require('express')
const app = express()
const path = require('path')
const loggers = require('./middleware/loggers')()

// Use normal request and response logging middleware
app.use(loggers.normal)

app.get('/', (req, res) => {
  res.status(200).type("text/html").send(`<h1>Hello world</h1><p>The current time is ${new Date().toLocaleString()}</p>`)
})

// Use static express middleware
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// Use error logging middleware
app.use(loggers.error)

module.exports = app
