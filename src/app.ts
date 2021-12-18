import express, { Request, Response, NextFunction } from 'express'

const app = express()
const port = 3000

const start = () => {
  var sag = 'salam'
  app.listen(port, () => {
    console.log(`Tilda application is running on port ${port}.`)
  })
}

export { start }
