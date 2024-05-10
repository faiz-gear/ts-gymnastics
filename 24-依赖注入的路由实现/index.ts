import http from 'http'
import { UserController } from './user.controller'
import { routerFactory } from './util'

const userRouter = routerFactory(new UserController())

http
  .createServer((req, res) => {
    for (const info of userRouter) {
      if (req.url === info.path && req.method === info.requestMethod.toLocaleUpperCase()) {
        info.requestHandler().then((data) => {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(data))
        })
      }
    }
  })
  .listen(3000)
  .on('listening', () => {
    console.log('Server ready at http://localhost:3000 \n')
    // console.log('GET /user/list at http://localhost:3000/user/list \n')
    // console.log('POST /user/add at http://localhost:3000/user/add \n')
    userRouter.forEach((info) => {
      console.log(`${info.requestMethod.toLocaleUpperCase()} ${info.path} at http://localhost:3000${info.path}`)
    })
  })
