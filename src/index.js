const log = require('./log').createLogger('[Server]')

log.info(`
 _____  _____                   _    ___       _  _
|   __||__   |   ___  ___  ___ | |_ |  _| ___ | ||_| ___
|   __||   __|  | . || . ||  _||  _||  _|| . || || || . |
|_____||_____|  |  _||___||_|  |_|  |_|  |___||_||_||___|
                |_|
`)

const port = process.env.PORT || 8080

require('./db')({ migrate: true, force: 'last' })
  .then((db) => {
    app = require('./app')
      .listen(port, () => {
        log.info(`Server listening on ${port}`)
      })
  })
  .catch(log.error)
