import { TErrorIssues, TErrorResponse } from '../../interfaces/TErrorResponse'

const handleGenericError = (err: Error): TErrorResponse => {
  const issues: TErrorIssues[] = [
    {
      path: '',
      message: err.message,
    },
  ]

  return {
    statusCode: 400,
    status: 'error',
    message: 'Unknown error',
    issues,
  }
}

export default handleGenericError
