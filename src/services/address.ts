import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'
import { Address, AddressModel } from 'models/address'
import { CryptocurrencyModel } from 'models/resources'

interface CreateAddress {
  name?: string
  crypto_id: string
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
    const { name = '', crypto_id, address } = data
    const { email } = requestingUser
    const user = await UserModel.findOne({ email })
      .select('fullname email addresses')
      .populate('addresses')
      .exec()
    const crypto = await CryptocurrencyModel.findById(crypto_id).lean()

    const checkIfAddresssIsDuplicate = () => {
      return new Promise<void>((resolve, reject) => {
        user.addresses.forEach((item: Address) => {
          if (item.name === name) {
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
        crypto,
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

const deleteAddress = async (
  address_id: string,
  requestingUser: RequestingUser,
) => {
  try {
    const { email } = requestingUser

    const addressOwner = await UserModel.findOne({ email })
    const address = await AddressModel.findById(address_id)

    console.log({ address, addressOwner })

    if (address.createdBy.equals(addressOwner._id)) {
      await address.delete()
      return httpResponse(StatusCodes.NO_CONTENT)
    }

    return httpResponse(StatusCodes.UNAUTHORIZED, {
      message: 'You are not authorized to perform this action',
    })
  } catch (err) {
    throw new Error(err)
  }
}

const getMyAddresses = async (requestingUser: RequestingUser) => {
  try {
    const { email } = requestingUser
    const userAddresses = await UserModel.findOne({ email })
      .select('addresses')
      .populate({
        path: 'addresses',
        populate: {
          path: 'crypto',
          model: 'Cryptocurrency',
        },
      })
      .exec()

    return httpResponse(StatusCodes.OK, { data: userAddresses })
  } catch (err) {
    throw new Error(err)
  }
}

const updateAddress = async (
  data: UpdateAddress,
  requestingUser: RequestingUser,
) => {
  // try {
  //   const { name = '', crypto, id: addressId } = data
  //   const { email } = requestingUser
  //   const user = await UserModel.findOne({ email })
  //     .select('fullname email addresses')
  //     .populate('addresses')
  //     .exec()
  //   const addressCrypto = CryptocurrencyModel.findById(crypto)
  //   const isOwnerOfThisAddress = user.addresses.find(
  //     item => item._id.toString() === addressId,
  //   )
  //   if (!isOwnerOfThisAddress) {
  //     return httpResponse(StatusCodes.UNAUTHORIZED)
  //   }
  //   await AddressModel.findByIdAndUpdate(addressId, {
  //     crypto,
  //     name,
  //   })
  //   return httpResponse(StatusCodes.OK, {
  //     message: 'The address has successfully been updated.',
  //   })
  // } catch (err) {
  //   throw new Error(err)
  // }
}

const AddressService = {
  createAddress,
  updateAddress,
  getMyAddresses,
  deleteAddress,
}

export default AddressService
