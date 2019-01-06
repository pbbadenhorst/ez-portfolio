let log = require('../log').createLogger('[App]')

let request_id = 0

function normal(req, res, next) {

  // Log request
  res.locals.request_id = ++request_id
  log.info(`${request_id} >>> ${req.method} ${req.url} [${req.socket.remoteAddress} ${req.socket.remotePort}]`)
  res.locals.request_start = new Date()

  // Register to log response when complete
  res.on('close', () => {
    let duration = new Date() - res.locals.request_start
    let statusCode = res.statusCode
    let text = `${request_id} <<< ${req.method} ${req.url} ${statusCode} [${res.getHeader('content-length') || 0} bytes, ${duration} ms]`

    if (statusCode >= 500) {
      log.error(text)
    } else if (statusCode >= 400) {
      log.warn(text)
    } else {
      log.info(text)
    }
  })
  next()
}

function error (err, res, req, next) {
  log.error(err)
  next(err)
}

module.exports = function () {
  return {
    normal: normal,
    error: error
  }
}
