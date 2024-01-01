/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import config from '../config'
import errorPreprocessor from '../helpers/errorHelpers/errorPreprocessor'
import { TErrorResponse } from '../interfaces/TErrorResponse'
// import { config } from 'dotenv'

/* eslint-disable @typescript-eslint/no-explicit-any */
const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const statusCode = err.statusCode || 500
  // const message = err.message || 'something went wrong'
  // const status = err.status || 'error'
  let errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    status: err.status || 'error',
    message: err.message || 'something went wrong',
    issues: err.issues || [],
  }
  //
  errorResponse = errorPreprocessor(err)
  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    issues: errorResponse.issues,
    stack: config.node_env === 'development' ? err.stack : undefined,
    amiError: err,
  })
}

export default globalErrorhandler
