import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { UserModel } from 'models/user'
import { httpResponse } from 'utils/http'
import { verifyToken } from 'utils/auth'

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    const response = httpResponse(StatusCodes.UNAUTHORIZED)
    return res.status(response.statusCode).send(response)
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (err) {
    const response = httpResponse(StatusCodes.UNAUTHORIZED)
    return res.status(response.statusCode).send(response)
  }

  const user = await UserModel.findById(payload.id)
  .select('name email')
  .lean()
  .exec()

  if (!user) {
    const response = httpResponse(StatusCodes.UNAUTHORIZED)
    return res.status(response.statusCode).send(response)
  }

  req.user = user
  next()
}

export { withAuth }