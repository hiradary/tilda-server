import mongoose from 'mongoose'

import { networkSchema, Network } from './address'

const { Schema } = mongoose

export interface Resources {
  networks: Network[]
}

const resourcesSchema = new Schema<Resources>({
  networks: [networkSchema]
})

const ResourcesModel = mongoose.model<Resources>('Resources', resourcesSchema)

export { ResourcesModel }
