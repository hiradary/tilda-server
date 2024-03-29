import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import type { User } from 'models/user'
import { httpResponse } from 'utils/http'

const getUserProfile = async (username: string) => {
  try {
    const user = await UserModel.findOne({ username })
      .select('fullname email username addresses bio socials')
      .populate({
        path: 'addresses',
        populate: {
          path: 'crypto',
          model: 'Cryptocurrency',
        },
      })
      .exec()

    if (user) {
      return httpResponse(StatusCodes.OK, { data: user })
    } else {
      return httpResponse(StatusCodes.UNAUTHORIZED, {
        message: 'User not found.',
      })
    }
  } catch (err) {
    throw new Error(err)
  }
}

const updateUserProfile = async (
  reqUser: RequestingUser,
  newUser: Omit<User, 'password' | 'addresses'>,
) => {
  try {
    // User is changing its username
    if (reqUser.username !== newUser.username) {
      const newUsernameAlreadyExists = await UserModel.findOne({
        username: newUser.username,
      })
      if (newUsernameAlreadyExists) {
        return httpResponse(StatusCodes.UNAUTHORIZED, {
          message: 'This username is already taken.',
        })
      }
    }

    const user = await UserModel.updateOne({ email: reqUser.email }, newUser)
      .lean()
      .exec()
    if (user) {
      return httpResponse(StatusCodes.OK, { data: user })
    } else {
      return httpResponse(StatusCodes.UNAUTHORIZED, {
        message: 'Cannot update user profile.',
      })
    }
  } catch (err) {
    throw new Error(err)
  }
}

const ProfileService = {
  getUserProfile,
  updateUserProfile,
}

export default ProfileService
