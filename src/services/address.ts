import { Types } from 'mongoose'
import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'
import { Address } from 'models/address'
import { ResourcesModel } from 'models/resources'

interface CreateAddress {
  name: string;
  address: string;
  network_id: Types.ObjectId
}

interface RequestingUser {
  email: string;
  name: string;
}

const createAddress = async (data: CreateAddress, requestingUser: RequestingUser) => {
  try {
    const { name, address, network_id } = data
    const {email} = requestingUser
    const userAddresses = await UserModel.findOne({ email }).select('addresses').lean().exec()
    const [{networks}] = await ResourcesModel.find().select('networks').lean().exec()
    
    console.log({networks, userAddresses, data})

    return httpResponse(StatusCodes.OK)
  }
  catch(err) {
    throw new Error(err)
  }
}

const AddressService = {createAddress}

export default AddressService