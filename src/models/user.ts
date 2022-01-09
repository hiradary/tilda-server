import mongoose, { Model, Document, } from 'mongoose'
import bcrypt from 'bcrypt'

import { Address } from './address'

const { Schema } = mongoose

interface User {
  name: string
  email: string
  password: string
  username?: string
  addresses: Address[]
}

export interface IUserModel extends User, Document {
  checkPassword(password: string): Promise<boolean | Error>
}

const userSchema = new Schema<User>({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 30,
  },
  username: {
    unique: true,
    type: String,
  },
  addresses: {
    type: [{type: Schema.Types.ObjectId}],
    ref: 'Address',
  },
})

const saltRounds = 10

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

const UserModel: Model<IUserModel> = mongoose.model<IUserModel>(
  'User',
  userSchema,
)

export { UserModel }
