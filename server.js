const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Add custom routes before JSON Server router
server.put('/todos', (req, res) => {
  if (Array.isArray(req.query.id)) {
    res.send()
  }
})

server.delete('/todos', (req, res) => {
  if (Array.isArray(req.query.id)) {
    res.send()
  }
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date()
    req.body.lastUpdatedAt = new Date()
  } else if (req.method === 'PUT') {
    req.body.lastUpdatedAt = new Date()
  }
  // Continue to JSON Server router
  next()
})

server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})
