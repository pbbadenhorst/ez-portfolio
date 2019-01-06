const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200).type("text/html").send(`<h1>Hello world</h1><p>The current time is ${new Date().toLocaleString()}</p>`)
})

module.exports = app
