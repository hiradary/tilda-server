import mongoose from 'mongoose'

const { Schema } = mongoose

const networkSchema = new Schema({
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

const addressSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  address: String,
  network: networkSchema,
})

const Address = mongoose.model('Address', addressSchema)

export { Address, addressSchema, networkSchema }
