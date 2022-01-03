declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    NODE_ENV: 'development' | 'production' | 'testing'
  }
}

declare namespace Express {
  export interface Request {
    user?: {
      name: string
      email: string
    }
  }
}
