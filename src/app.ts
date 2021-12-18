import express, { Request, Response, NextFunction } from 'express'

const app = express()
const port = 4000

const start = () => {
  app.listen(port, () => {
    console.log(`Tilda application is running on port ${port}.`)
  })
}

export { start }
