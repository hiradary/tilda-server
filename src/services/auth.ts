import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'
import { createToken, createUsername } from 'utils/auth'

//TODO: do some validation on service inputs

interface SignUp {
  name: string
  email: string
  password: string
}

interface SignIn {
  username?: string
  email?: string
  password: string
}

const signUp = async (data: SignUp) => {
  try {
    const { email, name, password } = data
    const existingUser = await UserModel.findOne({ email }).exec()
    if (existingUser) {
      return httpResponse(StatusCodes.BAD_REQUEST, {
        message: 'User is already registered.',
      })
    }

    const user = await UserModel.create({
      email,
      name,
      password,
      username: createUsername(name),
    })
    const token = createToken(user)

    return httpResponse(StatusCodes.OK, {
      data: { email, name, token, username: user.username },
    })
  } catch (err) {
    throw new Error(err)
  }
}

const signIn = async (data: SignIn) => {
  const { email, username, password } = data
  const invalidMessage = 'Invalid email/username and passoword combination.'

  try {
    if (!email && !username) {
      return httpResponse(StatusCodes.UNAUTHORIZED, { message: invalidMessage })
    }

    const user = await UserModel.findOne({
      [email ? 'email' : 'username']: email || username,
    })

    if (!user) {
      return httpResponse(StatusCodes.UNAUTHORIZED, { message: invalidMessage })
    }

    const match = await user.checkPassword(password)

    if (!match) {
      return httpResponse(StatusCodes.UNAUTHORIZED, { message: invalidMessage })
    }

    const token = createToken(user)

    return httpResponse(StatusCodes.OK, {
      data: {
        token,
        user: {
          email: user.email,
          username: user.username,
          name: user.name,
        },
      },
    })
  } catch (err) {
    throw new Error(err)
  }
}

const AuthService = { signUp, signIn }

export default AuthService
