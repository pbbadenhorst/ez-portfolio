const logger =  require('simple-node-logger')
const path = require('path')

function createManager() {
  const manager = logger.createLogManager();

  manager.createRollingFileAppender({
    logDirectory: path.resolve(__dirname, '..', 'logs'),
    fileNamePattern:'node-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
  })

  return {
    createLogger(category, level = 'all') {
      return manager.createLogger(category, level)
    }
  }
}

module.exports = createManager()
