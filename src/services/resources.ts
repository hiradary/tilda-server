import { StatusCodes } from 'http-status-codes'

import { ResourcesModel } from 'models/resources'
import { httpResponse } from 'utils/http'

const getAllResources = async () => {
  try {
    const [resources] = await ResourcesModel.find()
    return httpResponse(StatusCodes.OK, { data: resources })
  } catch (err) {
    throw new Error(err)
  }
}

const ResourcesServices = { getAllResources }

export default ResourcesServices
