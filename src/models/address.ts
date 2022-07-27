import mongoose, { Types, Model, PopulatedDoc } from 'mongoose'

import { Cryptocurrency } from './resources'

const { Schema } = mongoose

export interface Address {
  _id: Types.ObjectId
  name: string
  crypto: PopulatedDoc<Cryptocurrency>
  address: string
  createdBy: Types.ObjectId
}

export interface IAddressModel extends Address, Document {}

const addressSchema = new Schema<Address>({
  name: {
    type: String,
    required: false,
  },
  crypto: {
    type: Schema.Types.ObjectId,
    ref: 'Cryptocurrency',
  },
  address: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const AddressModel: Model<IAddressModel> = mongoose.model<IAddressModel>(
  'Address',
  addressSchema,
)

export { addressSchema, AddressModel }
