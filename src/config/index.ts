import dotenv from 'dotenv'

type NodeEnv = 'development' | 'production' | 'testing'

interface EnvSpecificConfig {
  databaseURL: string
  jwt: {
    secret: string
    expiry: string
  }
  aesSecret: string
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

const baseConfig = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
}

const envSpecificConfig: { [env in NodeEnv]: EnvSpecificConfig } = {
  development: {
    databaseURL: process.env.DEV_DATABASE_URI,
    jwt: {
      secret: process.env.DEV_JWT_SECRET,
      expiry: process.env.DEV_JWT_EXPIRY,
    },
    aesSecret: process.env.DEV_AES_SECRET,
  },

  production: {
    databaseURL: process.env.PROD_DATABASE_URI,
    jwt: {
      secret: process.env.PROD_JWT_SECRET,
      expiry: process.env.PROD_JWT_EXPIRY,
    },
    aesSecret: process.env.PROD_AES_SECRET,
  },

  testing: {
    databaseURL: process.env.TESTING_DATABASE_URI,
    jwt: {
      secret: process.env.TESTING_JWT_SECRET,
      expiry: process.env.TESTING_JWT_EXPIRY,
    },
    aesSecret: process.env.TESTING_AES_SECRET,
  },
}

export default { ...baseConfig, ...envSpecificConfig[baseConfig.env] }
