const sqlite3 = require('sqlite3')
const db = new sqlite3.Database("data.sqlite")

db.run(`CREATE TABLE IF NOT EXISTS _migrations
(
    id integer PRIMARY KEY,
    name text UNIQUE
)`)

require('http')
    .createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(`<h1>Hello world</h1><p>The current time is ${new Date().toLocaleString()}</p>`)
    })
    .listen(process.env.PORT || 8080)
    .on('close', () => db.close())
