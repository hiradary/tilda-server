import { Request, Response } from 'express'

const signUp = async (req: Request, res: Response) => {
  res.send('Sign up')
}

const signIn = async (req: Request, res: Response) => {
  res.send('Sign in')
}

const confirmSignUp = async (req: Request, res: Response) => {
  res.send('Confirm sign up')
}

const controllers = {
  signIn,
  signUp,
  confirmSignUp,
}

export default controllers
