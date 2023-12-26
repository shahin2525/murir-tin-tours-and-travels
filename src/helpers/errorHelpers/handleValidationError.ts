import mongoose from 'mongoose'
import { TErrorIssues, TErrorResponse } from '../../interfaces/TErrorResponse'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorValues = Object.values(err.errors)

  const issues: TErrorIssues[] = []
  errorValues.forEach((errorObj) => {
    issues.push({
      path: errorObj.path,
      message: errorObj.message,
    })
  })

  return {
    statusCode: 400,
    status: 'error',
    message: 'validation error',
    issues,
  }
}

export default handleValidationError
