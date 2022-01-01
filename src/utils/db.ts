import mongoose, { MongooseOptions } from 'mongoose'

import config from 'config'

export const connectDb = (
  url: string = config.databaseURL,
  opts: MongooseOptions = {},
) => {
  return mongoose.connect(url, {
    autoIndex: false,
    ...opts,
  })
}