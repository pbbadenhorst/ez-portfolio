require('http')
    .createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(`<h1>Hello world</h1><p>The current time is ${new Date().toLocaleString()}</p>`)
    })
    .listen(process.env.PORT || 8080)
