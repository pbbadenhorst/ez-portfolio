require('./db')({ migrate: true, force: 'last' })
  .then((db) => {
    require('./app')
      .listen(process.env.PORT || 8080)
  })
  .catch(log.error)

