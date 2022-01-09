import mongoose, { Types, Model } from 'mongoose'

const { Schema } = mongoose

export interface Network {
  _id: Types.ObjectId
  name: string
  symbol: string
}

export interface Address {
  name: string
  address: string
  network: Types.ObjectId
  createdBy: Types.ObjectId
}

export interface INetworkModel extends Network, Document {}
export interface IAddressModel extends Address, Document {}

const networkSchema = new Schema<Network>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  symbol: {
    type: String,
    unique: true,
    required: true,
  },
})

const addressSchema = new Schema<Address>({
  name: {
    type: String,
    required: true,
  },
  address: String,
  network: {
    type: Schema.Types.ObjectId,
    ref: 'Network'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const NetworkModel: Model<INetworkModel> = mongoose.model<INetworkModel>(
  'Network',
  networkSchema,
)
const AddressModel: Model<IAddressModel> = mongoose.model<IAddressModel>(
  'Address',
  addressSchema,
)

export { addressSchema, networkSchema, NetworkModel, AddressModel }
