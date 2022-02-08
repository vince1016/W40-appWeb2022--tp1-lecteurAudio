const jsonServer = require('json-server')
const expressApp = require('express')
const path = require('path')

// Création du serveur
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router('./server/songs.json')

server.use(middlewares)

// Simule un temps d'attente...
server.get('/songs', (req, res, next) => {
  setTimeout(() => {
    next()
  }, 2000)
})

const dirname = path.resolve(path.dirname(''))

server.use('/dist', expressApp.static(path.join(dirname, '/dist')))

server.use(router)
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
