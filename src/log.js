const logger =  require('simple-node-logger')
const path = require('path')
const fs = require('fs')

function createManager() {
  const manager = logger.createLogManager();

  // Create directory if missing
  const logDirectory = path.resolve(__dirname, '..', 'logs')
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory)
  }

  // Setup rolling file logging
  manager.createRollingFileAppender({
    logDirectory,
    fileNamePattern:'www-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
  })

  return {
    createLogger(category, level = 'all') {
      return manager.createLogger(category, level)
    }
  }
}

module.exports = createManager()
