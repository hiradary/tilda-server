import { Model } from 'mongoose'

import { NodeEnv } from 'config'
import { ResourcesModel, IResourcesModel } from 'models/resources'
import { BLOCKCHAIN_NETWORKS } from 'constants/networks'

interface SeedEntityConfig<T> {
  model: T;
  data: any
}

type ModelType = Model<IResourcesModel>

const seederConfig: {[key in NodeEnv]: SeedEntityConfig<ModelType>[]} = {
  development: [
    {
      model: ResourcesModel,
      data: {
        networks: BLOCKCHAIN_NETWORKS
      }
    }
  ],
  production: [
    {
      model: ResourcesModel,
      data: {
        networks: BLOCKCHAIN_NETWORKS
      }
    }
  ],
  testing: [
    {
      model: ResourcesModel,
      data: {
        networks: BLOCKCHAIN_NETWORKS
      }
    }
  ]
}

export const seedEntity = (seedConfig: SeedEntityConfig<ModelType>) => {
  return new Promise((resolve, reject) => {
    const { data, model } = seedConfig
    model.create(data).then(resolve).catch(reject)
  })
}

export const seedDb = async (env: NodeEnv) => {
  try {
    const envSpecificSeederData = seederConfig[env]

    await envSpecificSeederData.forEach(({model, data}) => {
      model.create(data)
    })

    console.log('Finished seeding')
  }
  catch(err) {
    throw new Error(err)
  }
}