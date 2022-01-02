import { ObjectId } from 'mongoose'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'

interface CreateAddress {
  name: string;
  address: string;
  network_id: ObjectId
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
    //TODO: incomplete
  }
  catch(err) {
    throw new Error(err)
  }
}

const AddressService = {createAddress}

export default AddressService