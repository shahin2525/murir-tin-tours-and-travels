export type TErrorResponse = {
  statusCode: number
  status: 'fail' | 'error'
  message: string
  issues: TErrorIssues[]
}

export type TErrorIssues = {
  path: string
  message: string
}
