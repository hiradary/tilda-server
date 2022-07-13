declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    NODE_ENV: 'development' | 'production' | 'testing'
  }
}

declare namespace Express {
  export interface User {
    username: string
    email: string
  }

  export interface Request {
    user?: User
  }
}
