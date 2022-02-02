import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'
import { Address, AddressModel, NetworkModel } from 'models/address'

interface CreateAddress {
  name?: string
  address: string
  network_id: string
}

interface EditAddress extends CreateAddress {
  id: string
}

interface RequestingUser {
  email: string
  name: string
}

const createAddress = async (
  data: CreateAddress,
  requestingUser: RequestingUser,
) => {
  try {
    const { name = '', address, network_id } = data
    const { email } = requestingUser
    const user = await UserModel.findOne({ email })
      .select('name email addresses')
      .populate('addresses')
      .exec()

    const checkIfAddresssIsDuplicate = () => {
      return new Promise<void>((resolve, reject) => {
        user.addresses.forEach((item: Address) => {
          if (item.name === name || item.address === address) {
            if (item.network.toString() === network_id) {
              reject('The address is already exist.')
            }
          }
        })
        resolve()
      })
    }

    const checkIfNetworkIsValid = () => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const targetNetwork = await NetworkModel.findById(network_id)
          if (targetNetwork) {
            resolve()
          } else {
            reject('network_id is invalid.')
          }
        } catch (err) {
          reject('network_id is invalid.')
        }
      })
    }

    try {
      await checkIfAddresssIsDuplicate()
      await checkIfNetworkIsValid()

      const newAddress = await AddressModel.create({
        name,
        address,
        network: network_id,
        createdBy: user.id,
      })

      await user.updateOne({
        $push: {
          addresses: newAddress.id,
        },
      })

      return httpResponse(StatusCodes.CREATED, {
        message: 'New address has successfully been created.',
      })
    } catch (err) {
      return httpResponse(StatusCodes.UNAUTHORIZED, {
        message: err,
      })
    }
  } catch (err) {
    throw new Error(err)
  }
}

const editAddress = async (
  data: EditAddress,
  requestingUser: RequestingUser,
) => {
  try {
    const { name = '', address, network_id, id: addressId } = data
    const { email } = requestingUser
    const user = await UserModel.findOne({ email })
      .select('name email addresses')
      .populate('addresses')
      .exec()

    const isOwnerOfThisAddress = user.addresses.find(
      item => item._id.toString() === addressId,
    )

    if (!isOwnerOfThisAddress) {
      return httpResponse(StatusCodes.UNAUTHORIZED)
    }

    await AddressModel.findByIdAndUpdate(addressId, {
      address,
      name,
      network: network_id,
    })

    return httpResponse(StatusCodes.OK, {
      message: 'The address has successfully been updated.',
    })
  } catch (err) {
    throw new Error(err)
  }
}

const AddressService = { createAddress, editAddress }

export default AddressService
