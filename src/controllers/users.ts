import { Request, Response } from 'express'

import AddressService from 'services/address'
import ProfileService from 'services/profile'

const createAddress = async (req: Request, res: Response) => {
  try {
    const payload = await AddressService.createAddress(req.body, req.user)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const editAddress = async (req: Request, res: Response) => {
  try {
    const payload = await AddressService.editAddress(req.body, req.user)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params
    const payload = await ProfileService.getUserProfile(username)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const address = {
  create: createAddress,
  edit: editAddress,
}

const profile = {
  get: getUserProfile,
}

export { address, profile }
