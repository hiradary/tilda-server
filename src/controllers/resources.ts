import { Request, Response } from 'express'

import ResourcesService from 'services/resources'

const getCryptocurrencies = async (req: Request, res: Response) => {
  try {
    const payload = await ResourcesService.getCryptoCurrencies()
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const cryptocurrencies = {
  get: getCryptocurrencies,
}

export { cryptocurrencies }
