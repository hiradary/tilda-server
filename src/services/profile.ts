import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'

interface RequestingUser {
  email: string
  name: string
}

const getUserProfile = async (username, requestingUser: RequestingUser) => {
  try {
    const user = await UserModel.findOne({ username })
      .select('name email username addresses')
      .populate({
        path: 'addresses',
        populate: [
          {
            path: 'network',
            model: 'Network',
          },
        ],
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

const ProfileService = {
  getUserProfile,
}

export default ProfileService
