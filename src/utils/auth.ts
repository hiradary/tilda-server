import { nanoid } from 'nanoid'
import { Types } from 'mongoose'
import jwt from 'jsonwebtoken'

import config from 'config'

const createToken = <T extends { _id: Types.ObjectId }>(user: T) => {
  return jwt.sign({ id: user._id }, config.jwt.secret, {
    expiresIn: config.jwt.expiry,
  })
}

const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

const createUsername = (name: string) => {
  const uniqueId = nanoid(12)
  const trimmedName = name.split(' ').join('_')
  const generatedUsername = `${trimmedName}_${uniqueId}`

  return generatedUsername
}

export { createToken, verifyToken, createUsername }
