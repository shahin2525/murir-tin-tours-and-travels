import GenericError from '../../classess/errorClasses/GenericError'
import { TErrorIssues, TErrorResponse } from '../../interfaces/TErrorResponse'

const handleGenericError = (err: GenericError): TErrorResponse => {
  const issues: TErrorIssues[] = [
    {
      path: '',
      message: err.message,
    },
  ]

  return {
    statusCode: err?.statusCode || 500,
    status: 'error',
    message: 'generic error',
    issues,
  }
}

export default handleGenericError
