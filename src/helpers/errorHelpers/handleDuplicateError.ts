import mongoose from 'mongoose'
import { TErrorIssues, TErrorResponse } from '../../interfaces/TErrorResponse'

const handleDuplicateError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  //   const errorValues = Object.values(err.errors)
  const regex = /"([^"]+)"/
  const match = err.message.match(regex)
  const issues: TErrorIssues[] = match
    ? [
        {
          path: '',
          message: `duplicate value for ${match[1]}`,
        },
      ]
    : []

  return {
    statusCode: 409,
    status: 'error',
    message: 'duplicate error',
    issues,
  }
}

export default handleDuplicateError
