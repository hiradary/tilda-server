import { Request, Response } from 'express'

import ResourcesServices from 'services/resources'

const getAllResources = async (req: Request, res: Response) => {
  try {
    const payload = await ResourcesServices.getAllResources()
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

export { getAllResources }
