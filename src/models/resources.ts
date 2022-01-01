import mongoose from 'mongoose'

import { networkSchema } from './address'

const { Schema } = mongoose

const resourcesSchema = new Schema({
  networks: [networkSchema]
})

const Resources = mongoose.model('Resources', resourcesSchema)

export { Resources }
