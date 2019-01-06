const sqlite = require('sqlite')
const path = require('path')
const log = require('../log').createLogger('[Database]')

module.exports = function(options) {

  let { databasePath, migrate, migrationsPath,  } = options || {}

  if (typeof migrate !== 'boolean') migrate = false
  if (typeof databasePath !== 'string') databasePath = path.resolve(__dirname, `database.${process.env.NODE_ENV || 'development'}.sqlite`)
  if (typeof migrationsPath !== 'string') migrationsPath = path.resolve(__dirname, 'migrations')

  let force = (migrate && (process.env.NODE_ENV !== 'production')) ? 'last' : undefined

  return Promise.resolve()
    .then(() => {
      log.info(`Opening connection: ${databasePath}`)
      return sqlite.open(databasePath)
    })
    .then((db) => {
      if (migrate) {
        log.info(`Performing migrations from: ${migrationsPath}`)
        return db.migrate({ force, migrationsPath })
      } else {
        return db
      }
    })
    .then((db) => {
      log.info(`Connection open.`)
      return db
    })
}
