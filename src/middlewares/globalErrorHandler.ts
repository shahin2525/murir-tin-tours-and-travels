/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { TErrorResponse } from '../interfaces/TErrorResponse'
import mongoose from 'mongoose'
import handleValidationError from '../helpers/errorHelpers/handleValidationError'
import handleDuplicateError from '../helpers/errorHelpers/handleDuplicateError'
import handleCastError from '../helpers/errorHelpers/handleCastError'
import handleGenericError from '../helpers/errorHelpers/handleGenericError'

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
  if (err instanceof mongoose.Error.ValidationError) {
    // ;(errorResponse.statusCode = 400),
    //   (errorResponse.message = 'validation error'),
    //   (errorResponse.status = 'error')

    // const errorValues = Object.values(err.errors)

    // errorValues.forEach(
    //   (errorObj: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    //     errorResponse.issues.push({
    //       path: errorObj.path,
    //       message: errorObj.message,
    //     })
    //   },
    // )

    errorResponse = handleValidationError(err)
  } else if (err.code && err.code === 11000) {
    // const regex = /"([^"]+)"/
    // const match = err.message.match(regex)
    // if (match) {
    //   const extractedText: string = match[1]
    //   errorResponse.statusCode = 409
    //   errorResponse.status = 'fail'
    //   errorResponse.message = 'duplicate error'
    //   errorResponse.issues = [
    //     {
    //       path: '',
    //       message: `duplicate value for ${extractedText}`,
    //     },
    //   ]
    // }
    errorResponse = handleDuplicateError(err)
  } else if (err instanceof mongoose.Error.CastError) {
    // errorResponse.statusCode = 400
    // errorResponse.status = 'error'
    // errorResponse.message = 'invalid Id'
    // errorResponse.issues = [
    //   {
    //     path: err.path,
    //     message: err.message,
    //   },
    // ]
    errorResponse = handleCastError(err)
  } else if (err instanceof Error) {
    errorResponse = handleGenericError(err)
  }
  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    issues: errorResponse.issues,
    // amiError: err,
  })
}

export default globalErrorhandler
