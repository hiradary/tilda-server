import { Request, Response } from 'express'

import AuthService from 'services/auth'

const signUp = async (req: Request, res: Response) => {
  try {
    const payload = await AuthService.signUp(req.body)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const signIn = async (req: Request, res: Response) => {
  try {
    const payload = await AuthService.signIn(req.body)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

export { signIn, signUp }
