const sqlite = require('sqlite')
const path = require('path')

module.exports = function(options) {

  let { databasePath, migrate, migrationsPath,  } = options || {}

  if (typeof migrate !== 'boolean') migrate = false
  if (typeof databasePath !== 'string') databasePath = path.resolve(__dirname, `database.${process.env.NODE_ENV || 'development'}.sqlite`)
  if (typeof migrationsPath !== 'string') migrationsPath = path.resolve(__dirname, 'migrations')

  let force = (migrate && (process.env.NODE_ENV !== 'production')) ? 'last' : undefined

  return Promise.resolve()
    .then(() => {
      return sqlite.open(databasePath)
    })
    .then((db) => {
      if (migrate) {
        return db.migrate({ force, migrationsPath })
      } else {
        return db
      }
    })
    .then((db) => {
      return db
    })
}
