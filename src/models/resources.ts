import mongoose, { Document, Model } from 'mongoose'

import { networkSchema, Network } from './address'

const { Schema } = mongoose

export interface Resources {
  networks: Network[]
}

export interface IResourcesModel extends Resources, Document {}

const resourcesSchema = new Schema<Resources>({
  networks: [networkSchema]
})

const ResourcesModel: Model<IResourcesModel> = mongoose.model<IResourcesModel>('Resources', resourcesSchema)

export { ResourcesModel }
