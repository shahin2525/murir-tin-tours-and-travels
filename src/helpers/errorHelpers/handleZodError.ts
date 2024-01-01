import { ZodError } from 'zod'
import { TErrorIssues, TErrorResponse } from '../../interfaces/TErrorResponse'

const handleZodError = (err: ZodError): TErrorResponse => {
  const issues: TErrorIssues[] = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  return {
    statusCode: 400,
    status: 'error',
    message: 'Validation error',
    issues,
  }
}

export default handleZodError
