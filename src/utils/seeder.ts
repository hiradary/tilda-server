import { Model } from 'mongoose'

import { NodeEnv } from 'config'
import { BLOCKCHAIN_NETWORKS } from 'constants/networks'
import { NetworkModel, INetworkModel } from 'models/address'

interface SeedEntityConfig<T> {
  model: T;
  data: any
}

type ModelType = Model<INetworkModel>

const seederConfig: {[key in NodeEnv]: SeedEntityConfig<ModelType>[]} = {
  development: [
    {
      model: NetworkModel,
      data: BLOCKCHAIN_NETWORKS
    }
  ],
  production: [
    {
      model: NetworkModel,
      data: BLOCKCHAIN_NETWORKS
    }
  ],
  testing: [
    {
      model: NetworkModel,
      data: BLOCKCHAIN_NETWORKS
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