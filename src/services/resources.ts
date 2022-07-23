import { StatusCodes } from 'http-status-codes'

import { httpResponse } from 'utils/http'
import { CryptocurrencyModel } from 'models/resources'

const getCryptoCurrencies = async () => {
  try {
    const data = await CryptocurrencyModel.find().lean()
    return httpResponse(StatusCodes.OK, { data })
  } catch (err) {
    throw new Error(err)
  }
}

const ResourcesService = { getCryptoCurrencies }

export default ResourcesService
