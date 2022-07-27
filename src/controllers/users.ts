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

const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { address_id } = req.params
    const payload = await AddressService.deleteAddress(address_id, req.user)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const getMyAddresses = async (req: Request, res: Response) => {
  try {
    const payload = await AddressService.getMyAddresses(req.user)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const updateAddress = async (req: Request, res: Response) => {
  // try {
  //   const payload = await AddressService.updateAddress(req.body, req.user)
  //   res.status(payload.statusCode).send(payload)
  // } catch (err) {
  //   console.log(err)
  //   res.status(500).end()
  // }
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

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.user
    const payload = await ProfileService.getUserProfile(username)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const payload = await ProfileService.updateUserProfile(req.user, req.body)
    res.status(payload.statusCode).send(payload)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

const address = {
  create: createAddress,
  update: updateAddress,
  delete: deleteAddress,
  getMyAddresses: getMyAddresses,
}

const profile = {
  get: getUserProfile,
  getMine: getMyProfile,
  update: updateUserProfile,
}

export { address, profile }
