import mongoose, { Types, Model } from 'mongoose'

const { Schema } = mongoose

export interface Address {
  _id: Types.ObjectId
  name: string
  address: string
  createdBy: Types.ObjectId
}

export interface IAddressModel extends Address, Document {}

const addressSchema = new Schema<Address>({
  name: {
    type: String,
    required: true,
  },
  address: String,
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
