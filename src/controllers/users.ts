import { Request, Response } from 'express'

const address = {
  create: (req: Request, res: Response) => {
    res.send('Created successfully!')
  },
}

export { address }
