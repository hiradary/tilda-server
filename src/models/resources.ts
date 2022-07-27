import mongoose, { Model } from 'mongoose'

const { Schema } = mongoose

export interface Cryptocurrency {
  name: string
  symbol: string
  logo: string
}

export interface ICryptocurrencyModel extends Cryptocurrency, Document {}

const cryptocurrencySchema = new Schema<Cryptocurrency>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
})

const CryptocurrencyModel: Model<ICryptocurrencyModel> =
  mongoose.model<ICryptocurrencyModel>('Cryptocurrency', cryptocurrencySchema)

export { cryptocurrencySchema, CryptocurrencyModel }
