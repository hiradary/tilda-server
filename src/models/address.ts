import mongoose from 'mongoose'

const { Schema } = mongoose

export interface Network {
  name: string;
  symbol: string
}

export interface Address {
  name: string;
  address: string;
  network: Network
}

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
  network: networkSchema,
})

const AddressModel = mongoose.model<Address>('Address', addressSchema)

export { AddressModel, addressSchema, networkSchema }
