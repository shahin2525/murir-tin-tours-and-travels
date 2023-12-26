import mongoose from 'mongoose'
import { TErrorIssues, TErrorResponse } from '../../interfaces/TErrorResponse'

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const issues: TErrorIssues[] = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  return {
    statusCode: 400,
    status: 'error',
    message: 'Invalid Id',
    issues,
  }
}

export default handleCastError
