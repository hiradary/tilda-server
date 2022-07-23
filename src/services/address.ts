import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'
import { Address, AddressModel } from 'models/address'

interface CreateAddress {
  name?: string
  address: string
}

interface UpdateAddress extends CreateAddress {
  id: string
}

const createAddress = async (
  data: CreateAddress,
  requestingUser: RequestingUser,
) => {
  try {
    const { name = '', address } = data
    const { email } = requestingUser
    const user = await UserModel.findOne({ email })
      .select('fullname email addresses')
      .populate('addresses')
      .exec()

    const checkIfAddresssIsDuplicate = () => {
      return new Promise<void>((resolve, reject) => {
        user.addresses.forEach((item: Address) => {
          if (item.name === name || item.address === address) {
            reject('The address is already exist.')
          }
        })
        resolve()
      })
    }

    try {
      await checkIfAddresssIsDuplicate()

      const newAddress = await AddressModel.create({
        name,
        address,
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

const updateAddress = async (
  data: UpdateAddress,
  requestingUser: RequestingUser,
) => {
  try {
    const { name = '', address, id: addressId } = data
    const { email } = requestingUser
    const user = await UserModel.findOne({ email })
      .select('fullname email addresses')
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
    })

    return httpResponse(StatusCodes.OK, {
      message: 'The address has successfully been updated.',
    })
  } catch (err) {
    throw new Error(err)
  }
}

const AddressService = { createAddress, updateAddress }

export default AddressService
