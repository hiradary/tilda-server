import { StatusCodes } from 'http-status-codes'

import { User } from 'models/user'
import { httpResponse } from 'utils/http'

interface SignUp {
  name: string
  email: string
  password: string
}

const signUp = async (user?: SignUp) => {
  try {
    const { email, name, password } = user
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
      return httpResponse(StatusCodes.BAD_REQUEST, {
        message: 'User is already registered.',
      })
    }

    //TODO: do some validation

    await User.create({ email, name, password })

    return httpResponse(StatusCodes.OK, { data: { email, name } })
  } catch (err) {
    throw new Error(err)
  }
}

const AuthService = { signUp }

export default AuthService
