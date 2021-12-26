import { Request, Response } from 'express'

import AuthService from 'services/auth'

const signUp = async (req: Request, res: Response) => {
  try {
    const payload = await AuthService.signUp(req.body)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.end()
  }
}

const signIn = async (req: Request, res: Response) => {
  res.send('Sign in')
}

const controllers = {
  signIn,
  signUp,
}

export default controllers
