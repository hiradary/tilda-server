import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'
import { Address } from 'models/address'
import { ResourcesModel } from 'models/resources'

interface AddressForm {
  name: string
  address: string
  network_id: string
}

interface RequestingUser {
  email: string
  name: string
}

const createAddress = async (
  data: AddressForm,
  requestingUser: RequestingUser,
) => {
  try {
    const { name, address, network_id } = data
    const { email } = requestingUser
    const user = await UserModel.findOne({ email })
      .select('name email addresses')
      .exec()
    const [{ networks }] = await ResourcesModel.find().select('networks').lean()
    const network = networks.find(({ _id }) => _id.toString() === network_id)

    let isDuplicate = false

    user.addresses.forEach(item => {
      if (item.name === name || item.address === address) {
        if (item.network._id.toString() === network_id) {
          isDuplicate = true
        }
      }
    })

    if (isDuplicate) {
      return httpResponse(StatusCodes.UNAUTHORIZED, {
        message: 'The address is already exist.',
      })
    }

    if (!network) {
      return httpResponse(StatusCodes.UNAUTHORIZED, {
        message: 'Network is not valid.',
      })
    }

    const newAddress: Address = {
      name,
      address,
      network,
      createdBy: user._id,
    }

    await user.updateOne({
      $push: {
        addresses: newAddress,
      },
    })

    return httpResponse(StatusCodes.OK, { data: newAddress })
  } catch (err) {
    throw new Error(err)
  }
}

// const editAddress = async (
//   data: AddressForm,
//   requestingUser: RequestingUser,
// ) => {}

const AddressService = { createAddress }

export default AddressService
