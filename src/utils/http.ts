import { StatusCodes, getReasonPhrase } from 'http-status-codes'

interface HttpResponseBase {
  statusCode: number
  status: string
}

interface ResponseWithMessage extends HttpResponseBase {
  message?: string
}

interface ResponseWithData extends HttpResponseBase {
  data?: any
}

type MessageOrData<T extends { message: string } | { data: any }> = T extends {
  message: string
}
  ? ResponseWithMessage
  : ResponseWithData

const httpResponse = <T extends { message: string } | { data: any }>(
  status: StatusCodes,
  response?: T,
): MessageOrData<T> => {
  return {
    statusCode: status,
    status: getReasonPhrase(status),
    ...(response ? { ...response } : {}),
  }
}

export { httpResponse }
