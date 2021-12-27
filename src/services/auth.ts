import { StatusCodes } from 'http-status-codes'

import { User } from 'models/user'
import { httpResponse } from 'utils/http'
import { createToken } from 'utils/auth'

//TODO: do some validation on service inputs

interface SignUp {
  name: string
  email: string
  password: string
}

interface SignIn {
  email: string
  password: string
}

const signUp = async (data: SignUp) => {
  try {
    const { email, name, password } = data
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
      return httpResponse(StatusCodes.BAD_REQUEST, {
        message: 'User is already registered.',
      })
    }

    const user = await User.create({ email, name, password })
    const token = createToken(user)

    return httpResponse(StatusCodes.OK, { data: { email, name, token } })
  } catch (err) {
    throw new Error(err)
  }
}

const signIn = async (data: SignIn) => {
  const { email, password } = data
  const invalidMessage = 'Invalid email and passoword combination.'

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return httpResponse(StatusCodes.UNAUTHORIZED, { message: invalidMessage })
    }

    const match = await user.checkPassword(password)

    if (!match) {
      return httpResponse(StatusCodes.UNAUTHORIZED, { message: invalidMessage })
    }

    const token = createToken(user)

    return httpResponse(StatusCodes.OK, { data: { token } })
  } catch (err) {
    throw new Error(err)
  }
}

const AuthService = { signUp, signIn }

export default AuthService
