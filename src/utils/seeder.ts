import { Model } from 'mongoose'

import { NodeEnv } from 'config'
import { Resources } from 'models/resources'
import { BLOCKCHAIN_NETWORKS } from 'constants/networks'

interface SeedEntityConfig {
  model: Model<any>;
  data: any
}

const seederConfig: {[key in NodeEnv]: Array<SeedEntityConfig>} = {
  development: [
    {
      model: Resources,
      data: {
        networks: BLOCKCHAIN_NETWORKS
      }
    }
  ],
  production: [
    {
      model: Resources,
      data: {
        networks: BLOCKCHAIN_NETWORKS
      }
    }
  ],
  testing: [
    {
      model: Resources,
      data: {
        networks: BLOCKCHAIN_NETWORKS
      }
    }
  ]
}

export const seedEntity = (seedConfig: SeedEntityConfig) => {
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