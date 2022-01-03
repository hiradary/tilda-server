import { Request, Response } from 'express'

import AddressService from 'services/address'

const create = async (req: Request, res: Response) => {
  try {
    const payload = await AddressService.createAddress(req.body, req.user)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const address = {
  create,
}

export { address }
