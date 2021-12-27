import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

import apiRoute from 'api/routes'
import config from 'config'
import { connectDb } from 'utils/db'

const app = express()
const { port } = config

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api', apiRoute)

const start = async () => {
  try {
    await connectDb()
    app.listen(port, () => {
      console.log(`Tilda application is running on port ${port}.`)
    })
  } catch (err) {
    console.log(err)
  }
}

export { start }
